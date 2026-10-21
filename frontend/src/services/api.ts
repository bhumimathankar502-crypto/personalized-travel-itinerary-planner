import { Trip, TripCreateInput, DestinationInfo, HealthStatus } from '../types';

// Use base URL from env if configured, otherwise relative path (handled by Vite proxy in dev)
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function checkBackendHealth(): Promise<HealthStatus> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      ai_provider: 'Knowledge Engine (Browser Fallback)',
      supabase_status: 'Local Cache',
      active_features: { offline_mode: true }
    };
  }
}

export async function fetchDestinations(query?: string): Promise<DestinationInfo[]> {
  try {
    const url = query 
      ? `${API_BASE}/api/destinations?query=${encodeURIComponent(query)}` 
      : `${API_BASE}/api/destinations`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend unavailable, using bundled Indian destinations:', err);
    // Return curated static Indian destinations
    return [
      {
        id: 'indore',
        name: 'Indore',
        state: 'Madhya Pradesh',
        tagline: "India's Cleanest City & Street Food Paradise",
        best_time_to_visit: 'October to March',
        ideal_duration_days: 3,
        tags: ['Food & Culinary', 'Heritage', 'Cleanest City'],
        image_url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
        average_daily_budget_inr: 2800,
        popular_attractions: ['Sarafa Night Food Market', 'Rajwada Palace', 'Chappan Dukan', 'Lal Bagh Palace']
      },
      {
        id: 'ujjain',
        name: 'Ujjain',
        state: 'Madhya Pradesh',
        tagline: 'City of Mahakal & Ancient Spiritual Vibrations',
        best_time_to_visit: 'October to March',
        ideal_duration_days: 2,
        tags: ['Spiritual & Pilgrimage', 'Temples', 'Heritage'],
        image_url: 'https://images.unsplash.com/photo-1621644805417-64016f4e1f76?auto=format&fit=crop&w=800&q=80',
        average_daily_budget_inr: 2200,
        popular_attractions: ['Mahakaleshwar Jyotirlinga', 'Mahakal Lok Corridor', 'Ram Ghat Aarti']
      },
      {
        id: 'jaipur',
        name: 'Jaipur',
        state: 'Rajasthan',
        tagline: 'The Pink City of Royal Forts & Vibrant Bazaars',
        best_time_to_visit: 'October to March',
        ideal_duration_days: 3,
        tags: ['Royal Heritage', 'Forts', 'Shopping'],
        image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
        average_daily_budget_inr: 3500,
        popular_attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Nahargarh Fort']
      },
      {
        id: 'varanasi',
        name: 'Varanasi',
        state: 'Uttar Pradesh',
        tagline: 'The Spiritual Heartbeat of India on the Holy Ganga',
        best_time_to_visit: 'October to March',
        ideal_duration_days: 3,
        tags: ['Spiritual', 'Ghats', 'Ganga Aarti', 'Ancient'],
        image_url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        average_daily_budget_inr: 2600,
        popular_attractions: ['Ganga Aarti at Dashashwamedh', 'Sunrise Boat Ride', 'Kashi Vishwanath Corridor']
      },
      {
        id: 'goa',
        name: 'Goa',
        state: 'Goa',
        tagline: 'Sun, Sand, Portuguese Heritage & Susegad Vibes',
        best_time_to_visit: 'October to April',
        ideal_duration_days: 4,
        tags: ['Beaches', 'Nightlife', 'Seafood', 'Portuguese'],
        image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        average_daily_budget_inr: 4000,
        popular_attractions: ['Basilica of Bom Jesus', 'Aguada Fort', 'Palolem Beach', 'Anjuna Flea Market']
      },
      {
        id: 'manali',
        name: 'Manali',
        state: 'Himachal Pradesh',
        tagline: 'Snow Peaks, Beas River & Himalayan Mountain Bliss',
        best_time_to_visit: 'March to June & Dec-Feb',
        ideal_duration_days: 4,
        tags: ['Mountains', 'Snow', 'Adventure Sports'],
        image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
        average_daily_budget_inr: 3400,
        popular_attractions: ['Solang Valley', 'Atal Tunnel', 'Hadimba Temple', 'Old Manali']
      }
    ];
  }
}

export async function generateTrip(input: TripCreateInput): Promise<Trip> {
  try {
    const res = await fetch(`${API_BASE}/api/generate-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(input)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Server error: ${res.status}`);
    }
    const trip: Trip = await res.json();
    saveTripLocally(trip);
    return trip;
  } catch (err: any) {
    console.warn('Backend generate failed, activating client fallback:', err);
    // Generate a fallback structured trip in browser
    const fallbackTrip = generateClientFallbackTrip(input);
    saveTripLocally(fallbackTrip);
    return fallbackTrip;
  }
}

export async function getSavedTrips(): Promise<Trip[]> {
  try {
    const res = await fetch(`${API_BASE}/api/trips`);
    if (res.ok) {
      const serverTrips: Trip[] = await res.json();
      if (serverTrips.length > 0) return serverTrips;
    }
  } catch (err) {
    console.warn('Could not fetch server trips, using localStorage:', err);
  }
  return getLocalTrips();
}

export async function deleteTrip(tripId: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/trips/${tripId}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Server delete failed, deleting locally:', err);
  }
  deleteTripLocally(tripId);
}

export async function regenerateTrip(tripId: string, input?: TripCreateInput): Promise<Trip> {
  try {
    const res = await fetch(`${API_BASE}/api/trips/${tripId}/regenerate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input || {})
    });
    if (res.ok) {
      const updated: Trip = await res.json();
      saveTripLocally(updated);
      return updated;
    }
  } catch (err) {
    console.warn('Server regenerate failed:', err);
  }
  if (input) {
    const regenerated = generateClientFallbackTrip(input);
    regenerated.id = tripId;
    regenerated.title = `Regenerated: ${regenerated.title}`;
    saveTripLocally(regenerated);
    return regenerated;
  }
  throw new Error('Could not regenerate trip');
}

// Local Storage Helper Persistence
const STORAGE_KEY = 'yatra_ai_saved_trips';

export function getLocalTrips(): Trip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTripLocally(trip: Trip): void {
  try {
    const existing = getLocalTrips();
    const idx = existing.findIndex(t => t.id === trip.id);
    if (idx >= 0) {
      existing[idx] = trip;
    } else {
      existing.unshift(trip);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function deleteTripLocally(tripId: string): void {
  try {
    const existing = getLocalTrips().filter(t => t.id !== tripId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to delete from localStorage:', e);
  }
}

// Client Fallback Generator for full resilience
function generateClientFallbackTrip(input: TripCreateInput): Trip {
  const d1 = new Date(input.start_date);
  const d2 = new Date(input.end_date);
  const diffDays = Math.max(1, Math.min(10, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)) + 1));
  const dailyBudget = input.total_budget / (diffDays * input.travelers_count);
  const tier = dailyBudget < 2500 ? 'Budget' : dailyBudget <= 6000 ? 'Moderate' : 'Luxury';

  const days = [];
  let stayTotal = 0;
  let foodTotal = 0;
  let activityTotal = 0;
  let transitTotal = 0;

  const stayRate = tier === 'Budget' ? 1200 : tier === 'Moderate' ? 3200 : 7500;

  for (let i = 1; i <= diffDays; i++) {
    const curDate = new Date(d1);
    curDate.setDate(curDate.getDate() + (i - 1));
    const dateStr = curDate.toISOString().split('T')[0];

    const act1Cost = Math.round(250 * input.travelers_count);
    const act2Cost = Math.round(500 * input.travelers_count);
    const act3Cost = Math.round(400 * input.travelers_count);
    const transitCost = Math.round(200 * input.travelers_count);

    stayTotal += stayRate;
    foodTotal += act2Cost;
    activityTotal += act1Cost + act3Cost;
    transitTotal += transitCost;

    days.push({
      id: `fallback-day-${i}`,
      day_number: i,
      date: dateStr,
      title: `Day ${i}: Highlights & Local Culture of ${input.destination}`,
      summary: `Explore iconic landmarks in the morning, savor regional specialties for lunch, and experience vibrant evening markets in ${input.destination}.`,
      estimated_daily_cost_inr: act1Cost + act2Cost + act3Cost + transitCost + stayRate,
      stay: {
        name: `Recommended ${tier} Hotel / Homestay`,
        type: tier === 'Budget' ? 'Hostel / Guest House' : 'Heritage Hotel',
        location: `Central ${input.destination}`,
        price_per_night_inr: stayRate,
        description: `Comfortable ${tier.toLowerCase()} stay with convenient access to local transit in ${input.destination}.`,
        booking_advice: 'Book online 1-2 weeks in advance for best verified rates.'
      },
      activities: [
        {
          id: `act-${i}-1`,
          time_slot: 'Morning',
          time_24h: '09:00 - 11:30',
          title: `Heritage Walk & Major Sights in ${input.destination}`,
          description: `Early morning exploration of the prominent cultural landmarks and architecture of ${input.destination}.`,
          category: 'Sightseeing',
          location_name: `Historic Landmark, ${input.destination}`,
          estimated_cost_inr: act1Cost,
          duration_minutes: 150,
          transit_info: 'Auto-rickshaw or taxi (approx ₹100-150)',
          is_cost_estimated: true
        },
        {
          id: `act-${i}-2`,
          time_slot: 'Afternoon',
          time_24h: '12:30 - 15:30',
          title: `Authentic Regional Lunch & Market Immersion`,
          description: `Enjoy local cuisine and delicacies. Browse traditional spice and textile bazaars in ${input.destination}.`,
          category: 'Food & Culture',
          location_name: `Bazaar & Dining Street, ${input.destination}`,
          estimated_cost_inr: act2Cost,
          duration_minutes: 180,
          transit_info: 'Walking or short e-rickshaw ride',
          is_cost_estimated: true
        },
        {
          id: `act-${i}-3`,
          time_slot: 'Evening',
          time_24h: '17:30 - 20:30',
          title: `Sunset Viewpoint, Local Street Food & Evening Dinner`,
          description: `Witness the sunset at a scenic vantage point, followed by famous street food tastings and a relaxed dinner.`,
          category: 'Leisure & Food',
          location_name: `Promenade / Sunset Point, ${input.destination}`,
          estimated_cost_inr: act3Cost,
          duration_minutes: 180,
          transit_info: 'Auto-rickshaw or walking',
          is_cost_estimated: true
        }
      ]
    });
  }

  const miscTotal = Math.round((stayTotal + foodTotal + activityTotal + transitTotal) * 0.08);
  const grandTotal = stayTotal + foodTotal + activityTotal + transitTotal + miscTotal;

  return {
    id: `trip-${Date.now()}`,
    title: `${diffDays}-Day ${input.travel_style} Trip to ${input.destination}`,
    destination: input.destination,
    state_or_country: 'India',
    start_date: input.start_date,
    end_date: input.end_date,
    duration_days: diffDays,
    travelers_count: input.travelers_count,
    travel_style: input.travel_style,
    budget_tier: tier,
    total_budget_inr: input.total_budget,
    estimated_cost_inr: grandTotal,
    currency: 'INR',
    cost_breakdown: {
      accommodation_inr: stayTotal,
      food_dining_inr: foodTotal,
      activities_sightseeing_inr: activityTotal,
      local_transport_inr: transitTotal,
      miscellaneous_inr: miscTotal,
      total_estimated_cost_inr: grandTotal
    },
    days,
    generated_by: 'YatraAI Indian Travel Engine',
    notes: input.notes,
    disclaimer: 'All prices, transit estimates, and timings are realistic Indian Rupee (INR) approximations. Verify live temple timings, museum schedules, and train/cab fares on site.'
  };
}
