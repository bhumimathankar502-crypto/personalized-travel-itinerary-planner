-- Seed Data for Testing & Demonstration
-- Sample Trip: 3-Day Indore & Ujjain Cultural & Food Explorer

INSERT INTO public.trips (
    id, title, destination, state_or_country, start_date, end_date, 
    duration_days, travelers_count, travel_style, budget_tier, 
    total_budget, estimated_cost, currency, interests, notes
) VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'Indore & Ujjain Heritage & Food Trail',
    'Indore & Ujjain',
    'Madhya Pradesh, India',
    CURRENT_DATE + INTERVAL '7 days',
    CURRENT_DATE + INTERVAL '9 days',
    3,
    2,
    'Cultural',
    'Moderate',
    25000.00,
    18400.00,
    'INR',
    ARRAY['Food', 'Heritage', 'Spiritual', 'Local Markets'],
    'Explore the cleanest city in India and the sacred Mahakaleshwar Jyotirlinga temple.'
) ON CONFLICT (id) DO NOTHING;

-- Day 1: Historic Indore & Legendary Sarafa Bazaar
INSERT INTO public.itinerary_days (
    id, trip_id, day_number, date, title, summary, estimated_daily_cost, stay_suggestion
) VALUES (
    'd1d1d1d1-1111-1111-1111-111111111111',
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    1,
    CURRENT_DATE + INTERVAL '7 days',
    'Royal Holkars & Sarafa Night Food Market',
    'Begin with Rajwada Palace and Lal Bagh, followed by world-famous late-night street food at Sarafa.',
    5500.00,
    '{"name": "Lemon Tree Hotel or boutique heritage homestay near South Tukoganj", "tier": "Moderate", "price_per_night_inr": 3200}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Activities Day 1
INSERT INTO public.activities (
    day_id, time_slot, time_24h, title, description, category, location_name, estimated_cost, duration_minutes, transit_info, is_cost_estimated, order_index
) VALUES
(
    'd1d1d1d1-1111-1111-1111-111111111111',
    'Morning',
    '09:00 - 11:30',
    'Rajwada Palace & Khajrana Ganesh Temple',
    'Visit the 7-story Holkar Dynasty palace blending Maratha, Mughal, and French styles, followed by blessings at Khajrana.',
    'Heritage',
    'MG Road, Indore',
    250.00,
    150,
    'Auto rickshaw or cab from hotel (approx 4 km, ₹100-150)',
    TRUE,
    1
),
(
    'd1d1d1d1-1111-1111-1111-111111111111',
    'Afternoon',
    '12:30 - 15:30',
    'Indori Poha-Jalebi Lunch & Lal Bagh Palace',
    'Authentic Indori lunch featuring Sev Tamatar, Bhutte Ka Kees, and tour the European-style Lal Bagh estate.',
    'Food',
    'South Tukoganj / Lal Bagh, Indore',
    900.00,
    180,
    'E-rickshaw or taxi (approx 5 km, ₹150)',
    TRUE,
    2
),
(
    'd1d1d1d1-1111-1111-1111-111111111111',
    'Evening',
    '19:00 - 22:30',
    'Sarafa Bazaar Midnight Street Food Extravaganza',
    'When the jewellery shops shut, the street transforms into India’s premier food hub: Dahi Vada, Garadu, and Rabdi-Jalebi.',
    'Food',
    'Sarafa Bazaar, Indore',
    1200.00,
    210,
    'Walking tour within old city; return by auto (approx ₹120)',
    TRUE,
    3
);
