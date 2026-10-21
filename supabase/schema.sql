-- ==============================================================================
-- Personalized Travel Itinerary Planner - Supabase Schema
-- Architecture: PostgreSQL + Row Level Security (RLS)
-- Optimized for Indian Destinations and INR Currency
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    preferred_currency TEXT DEFAULT 'INR',
    default_travel_style TEXT DEFAULT 'Balanced',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TRIPS TABLE
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    state_or_country TEXT DEFAULT 'India',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    duration_days INTEGER NOT NULL,
    travelers_count INTEGER NOT NULL DEFAULT 1,
    travel_style TEXT NOT NULL DEFAULT 'Balanced', -- Budget, Balanced, Luxury, Adventure, Cultural, Relaxed
    budget_tier TEXT NOT NULL DEFAULT 'Moderate',  -- Budget, Moderate, Luxury
    total_budget NUMERIC(12, 2) NOT NULL DEFAULT 0,
    estimated_cost NUMERIC(12, 2) NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'INR',
    interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ITINERARY DAYS TABLE
CREATE TABLE IF NOT EXISTS public.itinerary_days (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    date DATE,
    title TEXT,
    summary TEXT,
    estimated_daily_cost NUMERIC(10, 2) DEFAULT 0,
    stay_suggestion JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    day_id UUID NOT NULL REFERENCES public.itinerary_days(id) ON DELETE CASCADE,
    time_slot TEXT NOT NULL, -- Morning, Afternoon, Evening, Night
    time_24h TEXT,           -- e.g. "09:00 - 11:30"
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Sightseeing', -- Sightseeing, Food, Culture, Transit, Nature, Spiritual
    location_name TEXT,
    estimated_cost NUMERIC(10, 2) DEFAULT 0,
    duration_minutes INTEGER DEFAULT 90,
    transit_info TEXT,
    is_cost_estimated BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON public.trips(user_id);
CREATE INDEX IF NOT EXISTS idx_itinerary_days_trip_id ON public.itinerary_days(trip_id);
CREATE INDEX IF NOT EXISTS idx_activities_day_id ON public.activities(day_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES: Allow authenticated users full control of their records; allow anon users read/write for guest trips
-- Profiles
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trips: Users can access their own trips OR trips with NULL user_id (guest demo trips)
CREATE POLICY "Allow public read access to trips" 
ON public.trips FOR SELECT USING (true);

CREATE POLICY "Allow public insert on trips" 
ON public.trips FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users update own or guest trips" 
ON public.trips FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Allow users delete own or guest trips" 
ON public.trips FOR DELETE USING (auth.uid() = user_id OR user_id IS NULL);

-- Itinerary Days: Cascaded access
CREATE POLICY "Allow all access to itinerary_days" 
ON public.itinerary_days FOR ALL USING (true);

-- Activities: Cascaded access
CREATE POLICY "Allow all access to activities" 
ON public.activities FOR ALL USING (true);
