export interface Activity {
  id?: string;
  time_slot: 'Morning' | 'Afternoon' | 'Evening' | 'Night' | string;
  time_24h: string;
  title: string;
  description: string;
  category: string;
  location_name: string;
  estimated_cost_inr: number;
  duration_minutes: number;
  transit_info?: string;
  is_cost_estimated: boolean;
}

export interface StayRecommendation {
  name: string;
  type: string;
  location: string;
  price_per_night_inr: number;
  description?: string;
  booking_advice?: string;
}

export interface ItineraryDay {
  id?: string;
  day_number: number;
  date?: string;
  title: string;
  summary: string;
  estimated_daily_cost_inr: number;
  stay?: StayRecommendation;
  activities: Activity[];
}

export interface CostBreakdown {
  accommodation_inr: number;
  food_dining_inr: number;
  activities_sightseeing_inr: number;
  local_transport_inr: number;
  miscellaneous_inr: number;
  total_estimated_cost_inr: number;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  state_or_country: string;
  start_date: string;
  end_date: string;
  duration_days: number;
  travelers_count: number;
  travel_style: string;
  budget_tier: 'Budget' | 'Moderate' | 'Luxury' | string;
  total_budget_inr: number;
  estimated_cost_inr: number;
  currency: string;
  cost_breakdown: CostBreakdown;
  days: ItineraryDay[];
  generated_by: string;
  notes?: string;
  disclaimer: string;
  created_at?: string;
  updated_at?: string;
}

export interface TripCreateInput {
  destination: string;
  start_date: string;
  end_date: string;
  total_budget: number;
  travelers_count: number;
  travel_style: string;
  interests: string[];
  notes?: string;
}

export interface DestinationInfo {
  id: string;
  name: string;
  state: string;
  tagline: string;
  best_time_to_visit: string;
  ideal_duration_days: number;
  tags: string[];
  image_url: string;
  average_daily_budget_inr: number;
  popular_attractions: string[];
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
  ai_provider: string;
  supabase_status: string;
  active_features: Record<string, any>;
}
