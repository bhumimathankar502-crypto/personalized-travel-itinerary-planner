import { Handler } from '@netlify/functions';

// Curated Indian destinations knowledge base for serverless execution
const CURATED_DESTINATIONS = [
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    tagline: "India's Cleanest City & Street Food Paradise",
    best_time_to_visit: 'October to March',
    ideal_duration_days: 3,
    tags: ['Food & Culinary', 'Heritage', 'Cleanest City', 'Markets'],
    image_url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
    average_daily_budget_inr: 2800.0,
    lat: 22.7196,
    lng: 75.8577,
    weather_summary: 'Pleasant winters (15-28°C), dry warm summers',
    packing_tips: ['Light cottons', 'Walking shoes for Sarafa Bazaar', 'Light shawl for winter evenings'],
    popular_attractions: ['Sarafa Night Food Market', 'Rajwada Palace', 'Chappan Dukan', 'Lal Bagh Palace', 'Khajrana Ganesh Temple'],
    famous_foods: ['Indori Poha-Jalebi', 'Sev Tamatar', 'Bhutte Ka Kees', 'Garadu', 'Dahi Vada at Joshi'],
    transit_tip: 'Clean city buses (iBus BRTS), e-rickshaws, and auto rickshaws with metered/fixed fares.',
    stay_options: {
      Budget: { name: 'Zostel Indore or Central Station Stays', cost: 1200, type: 'Backpacker Hostel' },
      Moderate: { name: 'Lemon Tree Hotel or WOW Hotel', cost: 3400, type: '3-Star Boutique Hotel' },
      Luxury: { name: 'Sayaji Hotel Indore or Radisson Blu', cost: 7500, type: '5-Star Luxury' }
    }
  },
  {
    id: 'ujjain',
    name: 'Ujjain',
    state: 'Madhya Pradesh',
    tagline: 'City of Mahakal & Ancient Spiritual Vibrations',
    best_time_to_visit: 'October to March',
    ideal_duration_days: 2,
    tags: ['Spiritual & Pilgrimage', 'Heritage', 'Temples', 'Shipra River'],
    image_url: 'https://images.unsplash.com/photo-1621644805417-64016f4e1f76?auto=format&fit=crop&w=800&q=80',
    average_daily_budget_inr: 2200.0,
    lat: 23.1765,
    lng: 75.7885,
    weather_summary: 'Pleasant winter breezes along Shipra River',
    packing_tips: ['Modest traditional attire for temple darshans', 'Slip-on sandals', 'Cross-body pouch'],
    popular_attractions: ['Mahakaleshwar Jyotirlinga (Bhasma Aarti)', 'Mahakal Lok Corridor', 'Ram Ghat Shipra Aarti', 'Kal Bhairav Temple'],
    famous_foods: ['Dal Bafla', 'Kachori & Sabzi', 'Malpua', 'Bhang Thandai'],
    transit_tip: 'Shared auto rickshaws, e-rickshaws, and walking within temple complexes.',
    stay_options: {
      Budget: { name: 'Mahakal Dharamshala or Yatri Niwas', cost: 800, type: 'Pilgrim Guest House' },
      Moderate: { name: 'Anjushree Hotel or Imperial Hotel', cost: 2800, type: 'Comfort Hotel' },
      Luxury: { name: 'Rudraksh Club & Resort', cost: 6500, type: 'Heritage Luxury Resort' }
    }
  },
  {
    id: 'bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    tagline: 'City of Lakes & Ancient Rock Art Gateways',
    best_time_to_visit: 'July to March',
    ideal_duration_days: 3,
    tags: ['Lakes', 'Heritage', 'Rock Shelters', 'Tribal Culture'],
    image_url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    average_daily_budget_inr: 2500.0,
    lat: 23.2599,
    lng: 77.4126,
    weather_summary: 'Moderate climate with lush monsoons and scenic lakes',
    packing_tips: ['Casual walking clothes', 'Camera for Bhimbetka & VIP Road', 'Sneakers'],
    popular_attractions: ['Upper Lake (Bhojtal) & VIP Road', 'Bhimbetka Caves (UNESCO)', 'Sanchi Stupa Gateway', 'Taj-ul-Masajid', 'Tribal Museum'],
    famous_foods: ['Bhopali Gosht Korma / Paneer Rezala', 'Poha Jalebi', 'Bhopali Paan', 'Sulemani Chai'],
    transit_tip: 'BCLL City buses, Ola/Uber cabs, and auto rickshaws.',
    stay_options: {
      Budget: { name: 'Lake View Backpacker Hostel', cost: 1000, type: 'Hostel' },
      Moderate: { name: 'Noor-Us-Sabah Palace or Hotel Lake View Ashok', cost: 3600, type: 'Heritage Hotel' },
      Luxury: { name: 'Jehan Numa Palace Hotel', cost: 8500, type: 'Heritage Luxury' }
    }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City of Royal Forts & Vibrant Bazaars',
    best_time_to_visit: 'October to March',
    ideal_duration_days: 3,
    tags: ['Royal Heritage', 'Architecture', 'Shopping', 'Food'],
    image_url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    average_daily_budget_inr: 3500.0,
    lat: 26.9124,
    lng: 75.7873,
    weather_summary: 'Sunny desert days, brisk cool evenings (12-26°C)',
    packing_tips: ['Cotton layers', 'Sun protection & hat', 'Warm jacket for night desert visits'],
    popular_attractions: ['Amber Fort & Light Show', 'Hawa Mahal', 'City Palace & Jantar Mantar', 'Nahargarh Fort Sunset View', 'Johari & Bapu Bazaar'],
    famous_foods: ['Dal Baati Churma', 'Pyaaz Kachori at Rawat', 'Laal Maas / Gatte ki Sabzi', 'Ghewar at LMB'],
    transit_tip: 'Jaipur Metro for city center; e-rickshaws and cabs for fort climbs.',
    stay_options: {
      Budget: { name: 'Moustache Hostel Jaipur or Zostel', cost: 1100, type: 'Hostel' },
      Moderate: { name: 'Alsisar Haveli or Umaid Bhawan Heritage', cost: 3800, type: 'Heritage Haveli' },
      Luxury: { name: 'Rambagh Palace or Jai Mahal Palace', cost: 16000, type: 'Luxury Heritage Palace' }
    }
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: 'The Spiritual Heartbeat of India on the Holy Ganga',
    best_time_to_visit: 'October to March',
    ideal_duration_days: 3,
    tags: ['Ganga Aarti', 'Spiritual', 'Ancient City', 'Ghats'],
    image_url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    average_daily_budget_inr: 2600.0,
    lat: 25.3176,
    lng: 82.9739,
    weather_summary: 'Pleasant winter river breeze along the ghats',
    packing_tips: ['Slip-on footwear for narrow alleyways and temples', 'Modest attire', 'UPI apps'],
    popular_attractions: ['Dashashwamedh Ghat Evening Ganga Aarti', 'Subah-e-Banaras Sunrise Boat Ride', 'Kashi Vishwanath Temple Corridor', 'Sarnath Buddha Deer Park'],
    famous_foods: ['Banarasi Kachori Sabzi', 'Tamatar Chaat at Kashi Chaat Bhandar', 'Malaiyo (Winter Special)', 'Banarasi Paan'],
    transit_tip: 'Boats along the Ganges; walking through alleys (galis); e-rickshaws outside ghat zones.',
    stay_options: {
      Budget: { name: 'Moustache Varanasi or Zostel Varanasi', cost: 1000, type: 'Ghat-side Hostel' },
      Moderate: { name: 'BrijRama Palace Heritage or Scindhia Guest House', cost: 4200, type: 'Heritage Riverside' },
      Luxury: { name: 'Taj Ganges Varanasi', cost: 11000, type: '5-Star Luxury' }
    }
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    tagline: 'Sun, Sand, Portuguese Heritage & Susegad Vibes',
    best_time_to_visit: 'October to April',
    ideal_duration_days: 4,
    tags: ['Beaches', 'Portuguese Heritage', 'Nightlife', 'Water Sports'],
    image_url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    average_daily_budget_inr: 4000.0,
    lat: 15.2993,
    lng: 74.1240,
    weather_summary: 'Tropical sunny beach climate (24-32°C)',
    packing_tips: ['Beachwear & light cover-ups', 'Sunscreen & sunglasses', 'Driver license for scooter rental'],
    popular_attractions: ['Basilica of Bom Jesus & Old Goa', 'Aguada Fort & Lighthouse', 'Palolem & Agonda South Goa Beaches', 'Anjuna & Vagator Sunsets'],
    famous_foods: ['Goan Fish Curry & Rice', 'Bebinca Dessert', 'Poi with Chorizo / Mushroom Xacuti'],
    transit_tip: 'Renting a self-drive scooter (₹350-500/day) is the most popular way to explore Goa.',
    stay_options: {
      Budget: { name: 'Zostel Goa or Jungle Hostel Vagator', cost: 1200, type: 'Beach Hostel' },
      Moderate: { name: 'Heritage Portuguese Villa in Fontainhas', cost: 4200, type: 'Heritage Homestay' },
      Luxury: { name: 'Taj Exotica Resort & Spa South Goa', cost: 18000, type: '5-Star Beach Resort' }
    }
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    tagline: 'Snow Peaks, Beas River & Himalayan Mountain Bliss',
    best_time_to_visit: 'March to June & December to February (Snow)',
    ideal_duration_days: 4,
    tags: ['Mountains', 'Snow', 'Adventure Sports', 'Pine Valleys'],
    image_url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    average_daily_budget_inr: 3400.0,
    lat: 32.2396,
    lng: 77.1887,
    weather_summary: 'Sub-zero in winter snow season, pleasant summer (10-22°C)',
    packing_tips: ['Heavy woollens, thermals & windproof jacket', 'Waterproof trekking boots', 'Woollen cap & gloves'],
    popular_attractions: ['Solang Valley Paragliding & Skiing', 'Atal Tunnel & Sissu Lahaul Day Trip', 'Hadimba Devi Ancient Wooden Temple', 'Old Manali Cafes'],
    famous_foods: ['Siddu with Ghee', 'Himalayan Trout Fish', 'Tibetan Momos & Thukpa'],
    transit_tip: 'Local 4x4 cabs for Rohtang/Sissu; walking and rented motorcycles for Old Manali.',
    stay_options: {
      Budget: { name: 'Zostel Old Manali or The Hosteller', cost: 1100, type: 'Mountain Hostel' },
      Moderate: { name: 'Apple Country Resort or Snow Valley Resorts', cost: 3800, type: 'Pine Valley Resort' },
      Luxury: { name: 'The Himalayan Castle Luxury Resort', cost: 12000, type: 'Castle Resort' }
    }
  }
];

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Normalize path (handle /.netlify/functions/api or /api)
  const path = event.path
    .replace('/.netlify/functions/api', '')
    .replace('/api', '') || '/';

  // 1. Health check
  if (path === '/health' || path === '') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        ai_provider: 'Indian Knowledge Engine (Netlify Serverless Generative)',
        supabase_status: 'Active / Local Storage Persistence',
        active_features: {
          indian_localization: true,
          currency: 'INR (₹)',
          curated_destinations_count: CURATED_DESTINATIONS.length,
          serverless: true
        }
      })
    };
  }

  // 2. Destinations list
  if (path === '/destinations') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(CURATED_DESTINATIONS)
    };
  }

  // 3. Generate trip
  if (path === '/generate-trip' && event.httpMethod === 'POST') {
    try {
      const input = JSON.parse(event.body || '{}');
      const destination = (input.destination || 'Indore').trim();
      const destMatch = CURATED_DESTINATIONS.find(d => 
        d.name.toLowerCase() === destination.toLowerCase() || 
        d.id.toLowerCase() === destination.toLowerCase()
      ) || CURATED_DESTINATIONS[0];

      const d1 = new Date(input.start_date || new Date().toISOString());
      const d2 = new Date(input.end_date || new Date(Date.now() + 86400000 * 3).toISOString());
      const diffDays = Math.max(1, Math.min(10, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)) + 1));
      const travelers = Number(input.travelers_count) || 1;
      const budget = Number(input.total_budget) || 25000;
      const dailyBudget = budget / (diffDays * travelers);
      const tier = dailyBudget < 2500 ? 'Budget' : dailyBudget <= 6000 ? 'Moderate' : 'Luxury';

      const stayRate = (destMatch.stay_options as any)[tier]?.cost || 3200;
      let stayTotal = 0;
      let foodTotal = 0;
      let activityTotal = 0;
      let transitTotal = 0;

      const days = [];

      for (let i = 1; i <= diffDays; i++) {
        const curDate = new Date(d1);
        curDate.setDate(curDate.getDate() + (i - 1));
        const dateStr = curDate.toISOString().split('T')[0];

        const act1 = destMatch.popular_attractions[(i * 2 - 2) % destMatch.popular_attractions.length];
        const act2 = destMatch.popular_attractions[(i * 2 - 1) % destMatch.popular_attractions.length];
        const food = destMatch.famous_foods[(i - 1) % destMatch.famous_foods.length];

        const morningCost = Math.round(150 * travelers);
        const lunchCost = Math.round(400 * travelers);
        const eveningCost = Math.round(450 * travelers);
        const transitCost = Math.round(200 * travelers);

        stayTotal += stayRate;
        foodTotal += lunchCost + eveningCost;
        activityTotal += morningCost;
        transitTotal += transitCost;

        days.push({
          id: `day-${i}-${Date.now()}`,
          day_number: i,
          date: dateStr,
          title: `Day ${i}: Highlights of ${destMatch.name} & ${act1}`,
          summary: `Morning discovery at ${act1}, local culinary specialty with ${food}, and evening market exploration.`,
          estimated_daily_cost_inr: morningCost + lunchCost + eveningCost + transitCost + stayRate,
          stay: {
            name: (destMatch.stay_options as any)[tier]?.name || `Hotel in ${destMatch.name}`,
            type: (destMatch.stay_options as any)[tier]?.type || 'Comfort Hotel',
            location: `Central ${destMatch.name}`,
            price_per_night_inr: stayRate,
            booking_advice: 'Book 1-2 weeks in advance for verified seasonal rates.'
          },
          activities: [
            {
              id: `act-${i}-1`,
              time_slot: 'Morning',
              time_24h: '08:30 - 11:30',
              title: `Exploration of ${act1}`,
              description: `Begin the day with an early visit to ${act1} when crowds are minimal.`,
              category: 'Sightseeing',
              location_name: `${act1}, ${destMatch.name}`,
              estimated_cost_inr: morningCost,
              duration_minutes: 180,
              transit_info: `Auto-rickshaw or cab (approx ₹100-150)`,
              is_cost_estimated: true,
              lat: destMatch.lat + 0.012,
              lng: destMatch.lng + 0.008
            },
            {
              id: `act-${i}-2`,
              time_slot: 'Afternoon',
              time_24h: '12:30 - 15:30',
              title: `Regional Lunch & ${act2}`,
              description: `Enjoy authentic lunch featuring ${food}, followed by a tour of ${act2}.`,
              category: 'Food & Sightseeing',
              location_name: `Historic District, ${destMatch.name}`,
              estimated_cost_inr: lunchCost,
              duration_minutes: 180,
              transit_info: 'Short walk or e-rickshaw ride',
              is_cost_estimated: true,
              lat: destMatch.lat - 0.006,
              lng: destMatch.lng + 0.014
            },
            {
              id: `act-${i}-3`,
              time_slot: 'Evening',
              time_24h: '17:30 - 21:00',
              title: `Sunset Stroll & Night Food Market`,
              description: `Experience evening bazaar vibrancy and authentic dinner in ${destMatch.name}.`,
              category: 'Food & Culture',
              location_name: `Main Promenade, ${destMatch.name}`,
              estimated_cost_inr: eveningCost,
              duration_minutes: 210,
              transit_info: destMatch.transit_tip,
              is_cost_estimated: true,
              lat: destMatch.lat - 0.015,
              lng: destMatch.lng - 0.010
            }
          ]
        });
      }

      const misc = Math.round((stayTotal + foodTotal + activityTotal + transitTotal) * 0.08);
      const grandTotal = stayTotal + foodTotal + activityTotal + transitTotal + misc;

      const tripResponse = {
        id: `trip-${Date.now()}`,
        title: `${diffDays}-Day ${input.travel_style || 'Cultural & Heritage'} Journey to ${destMatch.name}`,
        destination: destMatch.name,
        state_or_country: `${destMatch.state}, India`,
        start_date: input.start_date,
        end_date: input.end_date,
        duration_days: diffDays,
        travelers_count: travelers,
        travel_style: input.travel_style || 'Cultural & Heritage',
        budget_tier: tier,
        total_budget_inr: budget,
        estimated_cost_inr: grandTotal,
        currency: 'INR',
        cost_breakdown: {
          accommodation_inr: stayTotal,
          food_dining_inr: foodTotal,
          activities_sightseeing_inr: activityTotal,
          local_transport_inr: transitTotal,
          miscellaneous_inr: misc,
          total_estimated_cost_inr: grandTotal
        },
        days,
        generated_by: 'Indian Knowledge Engine (Netlify Production)',
        notes: input.notes,
        disclaimer: 'All prices, transit estimates, and timings are realistic Indian approximations in INR (₹). Verify local darshan timings and rail tickets locally.',
        coordinates: { lat: destMatch.lat, lng: destMatch.lng },
        weather_summary: destMatch.weather_summary,
        packing_tips: destMatch.packing_tips,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(tripResponse)
      };
    } catch (e: any) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ detail: `Generation failed: ${e.message}` })
      };
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: 'Personalized Travel Planner Netlify Endpoint' })
  };
};
