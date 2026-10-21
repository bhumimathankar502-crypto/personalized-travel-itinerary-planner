"""
Comprehensive Backend Test Suite
Tests health, destinations, AI/knowledge engine generation, persistence, update, and regeneration.
"""

import sys
import os
from pathlib import Path

# Force UTF-8 stdout for Windows terminals
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
sys.path.append(str(Path(__file__).resolve().parent.parent))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "active_features" in data
    assert data["active_features"]["indian_localization"] is True
    print("✅ Health check passed:", data["ai_provider"], "|", data["supabase_status"])

def test_get_destinations():
    response = client.get("/api/destinations")
    assert response.status_code == 200
    destinations = response.json()
    assert len(destinations) >= 15
    # Verify Indore and Ujjain are present
    names = [d["name"] for d in destinations]
    assert "Indore" in names
    assert "Ujjain" in names
    assert "Jaipur" in names
    print(f"✅ Destinations endpoint passed ({len(destinations)} curated Indian destinations loaded)")

def test_generate_trip_indore():
    payload = {
        "destination": "Indore",
        "start_date": "2026-11-01",
        "end_date": "2026-11-03",
        "total_budget": 20000.0,
        "travelers_count": 2,
        "travel_style": "Cultural & Heritage",
        "interests": ["Heritage Forts & Palaces", "Street Food & Dhabas"],
        "notes": "Looking for authentic Indori street food"
    }
    response = client.post("/api/generate-trip", json=payload)
    assert response.status_code == 201
    trip = response.json()
    assert trip["destination"] == "Indore"
    assert trip["duration_days"] == 3
    assert len(trip["days"]) == 3
    assert trip["currency"] == "INR"
    assert trip["cost_breakdown"]["total_estimated_cost_inr"] > 0
    
    # Verify each day has 3 time-slotted activities
    for day in trip["days"]:
        assert len(day["activities"]) == 3
        slots = [a["time_slot"] for a in day["activities"]]
        assert "Morning" in slots
        assert "Afternoon" in slots
        assert "Evening" in slots
        assert day["stay"] is not None

    print(f"✅ Trip generation passed: {trip['title']} | Estimated: ₹{trip['estimated_cost_inr']}")
    return trip["id"]

def test_trip_crud_and_regenerate(trip_id: str):
    # 1. Fetch saved trips
    response = client.get("/api/trips")
    assert response.status_code == 200
    trips = response.json()
    assert any(t["id"] == trip_id for t in trips)
    print("✅ Trip persistence and retrieval passed")

    # 2. Get trip by id
    response = client.get(f"/api/trips/{trip_id}")
    assert response.status_code == 200
    assert response.json()["id"] == trip_id
    print("✅ Trip details retrieval passed")

    # 3. Regenerate trip
    response = client.post(f"/api/trips/{trip_id}/regenerate", json={})
    assert response.status_code == 200
    regenerated = response.json()
    assert regenerated["id"] == trip_id
    print("✅ Trip regeneration passed:", regenerated["title"])

    # 4. Delete trip
    response = client.delete(f"/api/trips/{trip_id}")
    assert response.status_code == 204
    print("✅ Trip deletion passed")

if __name__ == "__main__":
    print("\n--- RUNNING BACKEND INTEGRATION TESTS ---")
    test_health_check()
    test_get_destinations()
    created_id = test_generate_trip_indore()
    test_trip_crud_and_regenerate(created_id)
    print("\n🎉 ALL BACKEND INTEGRATION TESTS PASSED WITH 100% SUCCESS!\n")
