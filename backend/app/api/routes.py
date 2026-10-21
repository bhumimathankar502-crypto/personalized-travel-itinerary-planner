"""
FastAPI Routes for Personalized Travel Itinerary Planner
"""

from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Path, Query, Body, status

from app.config import settings
from app.models.schemas import (
    TripCreateRequest, TripUpdateRequest, TripRegenerateRequest, TripResponse,
    DestinationInfo, HealthResponse
)
from app.services.indian_places_db import CURATED_DESTINATIONS
from app.services.ai_generator import generate_trip_itinerary
from app.services.supabase_service import db_service

router = APIRouter(prefix="/api", tags=["Travel Planner"])

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint providing status of API, AI engine, and Supabase"""
    ai_status = "Google Gemini 1.5 Flash" if settings.GEMINI_API_KEY else "Indian Knowledge Engine (Algorithmic Generative)"
    sb_status = "Supabase PostgreSQL Active" if db_service.is_configured else "Local Storage Persistence (Offline Mode)"
    
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version=settings.APP_VERSION,
        ai_provider=ai_status,
        supabase_status=sb_status,
        active_features={
            "indian_localization": True,
            "currency": "INR (₹)",
            "curated_destinations_count": len(CURATED_DESTINATIONS),
            "ai_generation": True,
            "persistence": True
        }
    )

@router.get("/destinations", response_model=List[DestinationInfo])
async def get_popular_destinations(query: Optional[str] = Query(None, description="Optional search filter")):
    """Get list of popular curated Indian destinations"""
    destinations = [DestinationInfo(**d) for d in CURATED_DESTINATIONS]
    if query:
        q = query.strip().lower()
        destinations = [
            d for d in destinations 
            if q in d.name.lower() or q in d.state.lower() or any(q in t.lower() for t in d.tags)
        ]
    return destinations

@router.post("/generate-trip", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
async def create_and_generate_trip(request: TripCreateRequest):
    """
    Generate a personalized travel itinerary based on user input.
    Validates destination, dates, budget, group size, and interests.
    """
    try:
        # Generate trip using AI / Knowledge Engine
        trip = await generate_trip_itinerary(request)
        # Automatically cache/save to persistence
        await db_service.save_trip(trip)
        return trip
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate travel itinerary: {str(e)}"
        )

@router.get("/trips", response_model=List[TripResponse])
async def get_saved_trips():
    """Retrieve all saved itineraries"""
    return await db_service.get_all_trips()

@router.get("/trips/{trip_id}", response_model=TripResponse)
async def get_trip_detail(trip_id: str = Path(..., description="The unique ID of the trip")):
    """Retrieve a single itinerary by ID"""
    trip = await db_service.get_trip_by_id(trip_id)
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    return trip

@router.post("/trips", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
async def save_existing_trip(trip: TripResponse):
    """Explicitly save or update an existing trip"""
    return await db_service.save_trip(trip)

@router.put("/trips/{trip_id}", response_model=TripResponse)
async def update_trip(
    trip_id: str = Path(..., description="The unique ID of the trip to update"),
    updates: TripUpdateRequest = ...
):
    """Update editable trip fields (title, budget, notes, or days)"""
    updated_trip = await db_service.update_trip(trip_id, updates)
    if not updated_trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    return updated_trip

@router.delete("/trips/{trip_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_trip(trip_id: str = Path(..., description="The unique ID of the trip to delete")):
    """Delete a saved itinerary"""
    success = await db_service.delete_trip(trip_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    return None

@router.post("/trips/{trip_id}/regenerate", response_model=TripResponse)
async def regenerate_trip_itinerary(
    trip_id: str = Path(..., description="The unique ID of the trip to regenerate"),
    request: Optional[TripRegenerateRequest] = Body(None)
):
    """Regenerate an itinerary while optionally modifying parameters or keeping original settings"""
    existing_trip = await db_service.get_trip_by_id(trip_id)
    if not existing_trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
        
    req = TripCreateRequest(
        destination=(request.destination if request and request.destination else existing_trip.destination),
        start_date=(request.start_date if request and request.start_date else existing_trip.start_date),
        end_date=(request.end_date if request and request.end_date else existing_trip.end_date),
        total_budget=(request.total_budget if request and request.total_budget else existing_trip.total_budget_inr),
        travelers_count=(request.travelers_count if request and request.travelers_count else existing_trip.travelers_count),
        travel_style=(request.travel_style if request and request.travel_style else existing_trip.travel_style),
        interests=(request.interests if request and request.interests else []),
        notes=(request.notes if request and request.notes else existing_trip.notes)
    )
    
    new_trip = await generate_trip_itinerary(req)
    # Preserve the same trip ID
    new_trip.id = existing_trip.id
    new_trip.title = f"Regenerated: {new_trip.title}"
    await db_service.save_trip(new_trip)
    return new_trip
