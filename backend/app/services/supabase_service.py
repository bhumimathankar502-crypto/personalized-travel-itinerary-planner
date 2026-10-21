"""
Data Persistence Service
Integrates with Supabase (PostgreSQL) when configured,
with automated local JSON persistence fallback for offline and local development.
"""

import json
import logging
import os
from typing import List, Optional, Dict, Any
from pathlib import Path

from app.config import settings
from app.models.schemas import TripResponse, TripUpdateRequest

logger = logging.getLogger(__name__)

# Path for local fallback storage
LOCAL_DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
LOCAL_DATA_FILE = LOCAL_DATA_DIR / "saved_trips.json"

def _ensure_local_storage():
    LOCAL_DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not LOCAL_DATA_FILE.exists():
        with open(LOCAL_DATA_FILE, "w", encoding="utf-8") as f:
            json.dump([], f, indent=2)

def _read_local_trips() -> List[Dict[str, Any]]:
    _ensure_local_storage()
    try:
        with open(LOCAL_DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error reading local trips: {e}")
        return []

def _write_local_trips(trips: List[Dict[str, Any]]):
    _ensure_local_storage()
    try:
        with open(LOCAL_DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(trips, f, indent=2)
    except Exception as e:
        logger.error(f"Error writing local trips: {e}")

class SupabaseService:
    def __init__(self):
        self.is_configured = bool(
            settings.SUPABASE_URL and 
            settings.SUPABASE_ANON_KEY and 
            "supabase.co" in settings.SUPABASE_URL
        )
        self.client = None
        if self.is_configured:
            try:
                from supabase import create_client, Client
                self.client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
                logger.info("Connected to Supabase client successfully.")
            except ImportError:
                logger.warning("supabase-py library not installed. Using local persistence fallback.")
                self.is_configured = False
            except Exception as e:
                logger.warning(f"Failed to initialize Supabase client: {e}. Falling back to local storage.")
                self.is_configured = False

    async def get_all_trips(self) -> List[TripResponse]:
        """Fetch all trips from Supabase or local storage"""
        if self.is_configured and self.client:
            try:
                # Query from Supabase
                response = self.client.table("trips").select("*").order("created_at", desc=True).execute()
                # Note: If Supabase table is empty or error occurs, fall back to local
                if response.data:
                    # In full DB schema, days and activities are joined, or can be fetched
                    return [TripResponse(**t) for t in response.data]
            except Exception as e:
                logger.warning(f"Supabase fetch failed: {e}. Loading from local cache.")

        # Local fallback
        local_data = _read_local_trips()
        return [TripResponse(**t) for t in local_data]

    async def get_trip_by_id(self, trip_id: str) -> Optional[TripResponse]:
        """Fetch trip by ID"""
        trips = await self.get_all_trips()
        for t in trips:
            if t.id == trip_id:
                return t
        return None

    async def save_trip(self, trip: TripResponse) -> TripResponse:
        """Save a new trip to persistence"""
        trip_dict = trip.model_dump()
        
        # 1. Try Supabase
        if self.is_configured and self.client:
            try:
                self.client.table("trips").upsert(trip_dict).execute()
                logger.info(f"Saved trip {trip.id} to Supabase successfully.")
            except Exception as e:
                logger.warning(f"Could not persist to Supabase ({e}). Persisting locally.")

        # 2. Always persist locally as well for offline resilience
        trips = _read_local_trips()
        # Check if already exists, update or append
        existing_idx = next((i for i, t in enumerate(trips) if t.get("id") == trip.id), None)
        if existing_idx is not None:
            trips[existing_idx] = trip_dict
        else:
            trips.insert(0, trip_dict)
        _write_local_trips(trips)
        
        return trip

    async def update_trip(self, trip_id: str, updates: TripUpdateRequest) -> Optional[TripResponse]:
        """Update existing trip"""
        trips = _read_local_trips()
        target_idx = next((i for i, t in enumerate(trips) if t.get("id") == trip_id), None)
        
        if target_idx is None:
            return None
            
        cur = trips[target_idx]
        update_data = updates.model_dump(exclude_unset=True)
        
        for k, v in update_data.items():
            if v is not None:
                cur[k] = v
                
        # Re-verify and save
        trips[target_idx] = cur
        _write_local_trips(trips)
        return TripResponse(**cur)

    async def delete_trip(self, trip_id: str) -> bool:
        """Delete a trip by ID"""
        # Try Supabase delete
        if self.is_configured and self.client:
            try:
                self.client.table("trips").delete().eq("id", trip_id).execute()
            except Exception as e:
                logger.warning(f"Supabase delete failed: {e}")

        # Local delete
        trips = _read_local_trips()
        initial_len = len(trips)
        trips = [t for t in trips if t.get("id") != trip_id]
        if len(trips) < initial_len:
            _write_local_trips(trips)
            return True
        return False

# Global instance
db_service = SupabaseService()
