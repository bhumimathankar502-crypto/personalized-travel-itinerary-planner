from datetime import date, datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ActivityItem(BaseModel):
    id: Optional[str] = None
    time_slot: str = Field(..., description="Morning, Afternoon, Evening, or Night")
    time_24h: str = Field(..., description="e.g. 09:00 - 11:30")
    title: str = Field(..., description="Activity title")
    description: str = Field(..., description="Details of activity and what to experience")
    category: str = Field("Sightseeing", description="Sightseeing, Food, Heritage, Culture, Adventure, Transit, Spiritual, Leisure")
    location_name: str = Field(..., description="Specific place or landmark name")
    estimated_cost_inr: float = Field(0.0, description="Estimated cost in INR (₹)")
    duration_minutes: int = Field(90, description="Duration in minutes")
    transit_info: Optional[str] = Field(None, description="Suggested mode: Auto, Metro, Cab, Bus, Walking")
    is_cost_estimated: bool = Field(True, description="Always true unless live ticketing is integrated")

class StayRecommendation(BaseModel):
    name: str = Field(..., description="Hotel, Hostel, or Homestay name/type")
    type: str = Field("Hotel", description="Hostel, Heritage Homestay, Boutique Hotel, Luxury Resort, Guest House")
    location: str = Field(..., description="Neighborhood or area")
    price_per_night_inr: float = Field(..., description="Estimated nightly cost in INR (₹)")
    description: Optional[str] = None
    booking_advice: Optional[str] = Field("Best booked 2-4 weeks in advance via standard travel portals", description="Practical tips")

class ItineraryDayItem(BaseModel):
    id: Optional[str] = None
    day_number: int = Field(..., ge=1)
    date: Optional[str] = Field(None, description="ISO Date string YYYY-MM-DD")
    title: str = Field(..., description="Theme or highlight of the day")
    summary: str = Field(..., description="Overview of the day's progression")
    estimated_daily_cost_inr: float = Field(0.0, description="Sum of day activities and meals in INR")
    stay: Optional[StayRecommendation] = None
    activities: List[ActivityItem] = Field(default_factory=list)

class CostBreakdown(BaseModel):
    accommodation_inr: float = Field(0.0)
    food_dining_inr: float = Field(0.0)
    activities_sightseeing_inr: float = Field(0.0)
    local_transport_inr: float = Field(0.0)
    miscellaneous_inr: float = Field(0.0)
    total_estimated_cost_inr: float = Field(0.0)

class TripCreateRequest(BaseModel):
    destination: str = Field(..., min_length=2, max_length=120, description="City or region in India (or worldwide)")
    start_date: str = Field(..., description="Start Date (YYYY-MM-DD)")
    end_date: str = Field(..., description="End Date (YYYY-MM-DD)")
    total_budget: float = Field(..., gt=0, description="Total budget in INR (₹)")
    travelers_count: int = Field(1, ge=1, le=50, description="Number of travelers")
    travel_style: str = Field("Balanced", description="Budget Backpacking, Cultural & Heritage, Adventure & Nature, Relaxed & Leisure, Food & Culinary, Spiritual & Pilgrimage, Luxury Explorer")
    interests: List[str] = Field(default_factory=list, description="e.g. ['Food', 'Temples', 'Architecture', 'Shopping', 'Nature']")
    notes: Optional[str] = Field(None, max_length=1000, description="Custom preferences or requirements")

class TripUpdateRequest(BaseModel):
    title: Optional[str] = None
    destination: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    total_budget: Optional[float] = None
    travelers_count: Optional[int] = None
    travel_style: Optional[str] = None
    interests: Optional[List[str]] = None
    notes: Optional[str] = None
    days: Optional[List[ItineraryDayItem]] = None

class TripRegenerateRequest(BaseModel):
    destination: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    total_budget: Optional[float] = None
    travelers_count: Optional[int] = None
    travel_style: Optional[str] = None
    interests: Optional[List[str]] = None
    notes: Optional[str] = None

class TripResponse(BaseModel):
    id: str
    title: str
    destination: str
    state_or_country: str = "India"
    start_date: str
    end_date: str
    duration_days: int
    travelers_count: int
    travel_style: str
    budget_tier: str
    total_budget_inr: float
    estimated_cost_inr: float
    currency: str = "INR"
    cost_breakdown: CostBreakdown
    days: List[ItineraryDayItem]
    generated_by: str = "Generative AI Knowledge Engine"
    notes: Optional[str] = None
    disclaimer: str = "All prices, timings, and transit estimates are approximate and tailored for Indian travel contexts (INR). Verify live operational timings and rates locally."
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class DestinationInfo(BaseModel):
    id: str
    name: str
    state: str
    tagline: str
    best_time_to_visit: str
    ideal_duration_days: int
    tags: List[str]
    image_url: str
    average_daily_budget_inr: float
    popular_attractions: List[str]

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    ai_provider: str
    supabase_status: str
    active_features: Dict[str, Any]
