import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Users, IndianRupee, Compass, Heart, 
  MapPin, AlertCircle, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { TripCreateInput } from '../types';
import { formatINR, calculatePerDayPerPerson } from '../utils/currency';
import { calculateDays, getTodayString, getDefaultEndDate } from '../utils/dates';

interface TripWizardProps {
  initialDestination?: string;
  onGenerate: (data: TripCreateInput) => Promise<void>;
  isLoading: boolean;
}

const POPULAR_STYLES = [
  { id: 'Cultural & Heritage', label: 'Cultural & Heritage', desc: 'Forts, temples, museums & traditions' },
  { id: 'Food & Culinary', label: 'Food & Culinary', desc: 'Iconic street food, dhabas & thalis' },
  { id: 'Budget Backpacking', label: 'Budget Backpacking', desc: 'Hostels, public transport & smart savings' },
  { id: 'Adventure & Nature', label: 'Adventure & Nature', desc: 'Treks, river rafting, hills & wildlife' },
  { id: 'Spiritual & Pilgrimage', label: 'Spiritual & Pilgrimage', desc: 'Ghats, aartis & sacred corridors' },
  { id: 'Relaxed & Leisure', label: 'Relaxed & Leisure', desc: 'Scenic cafes, sunsets & peaceful pacing' }
];

const POPULAR_INTERESTS = [
  'Heritage Forts & Palaces',
  'Street Food & Dhabas',
  'Temples & Ghats',
  'Nature & Hill Views',
  'Local Bazaars & Shopping',
  'Photography',
  'River Rafting & Adventure',
  'Cafes & Nightlife',
  'Wildlife & Sanctuaries'
];

const BUDGET_PRESETS = [15000, 30000, 60000, 100000];

export const TripWizard: React.FC<TripWizardProps> = ({
  initialDestination = '',
  onGenerate,
  isLoading
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [startDate, setStartDate] = useState(getTodayString());
  const [endDate, setEndDate] = useState(getDefaultEndDate(3));
  const [totalBudget, setTotalBudget] = useState(25000);
  const [travelersCount, setTravelersCount] = useState(2);
  const [travelStyle, setTravelStyle] = useState('Cultural & Heritage');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Heritage Forts & Palaces',
    'Street Food & Dhabas'
  ]);
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync if initialDestination changes
  React.useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
    }
  }, [initialDestination]);

  const durationDays = calculateDays(startDate, endDate);
  const perPersonPerDay = calculatePerDayPerPerson(totalBudget, durationDays, travelersCount);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!destination.trim()) {
      setErrorMsg('Please specify a destination (e.g. Indore, Jaipur, Manali, Goa).');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setErrorMsg('End date cannot be earlier than start date.');
      return;
    }

    if (totalBudget < 1000) {
      setErrorMsg('Please enter a realistic travel budget of at least ₹1,000.');
      return;
    }

    await onGenerate({
      destination: destination.trim(),
      start_date: startDate,
      end_date: endDate,
      total_budget: totalBudget,
      travelers_count: travelersCount,
      travel_style: travelStyle,
      interests: selectedInterests,
      notes: notes.trim() || undefined
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 px-6 sm:px-8 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Compass className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Trip Planner Wizard</h2>
              <p className="text-xs sm:text-sm text-emerald-100">
                Provide your travel details to generate a comprehensive daily schedule
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-sm text-rose-700">
              <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Destination */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Where do you want to travel?
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Indore, Bhopal, Jaipur, Udaipur, Goa, Varanasi, Manali"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-slate-900 text-sm transition-all"
              />
            </div>
            <p className="text-xs text-slate-500">
              Enter any Indian city, tourist circuit, or custom destination.
            </p>
          </div>

          {/* 2. Dates & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-slate-900 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-slate-900 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs sm:text-sm text-emerald-800">
            <span className="font-medium">Planned Duration:</span>
            <span className="font-bold text-emerald-900">{durationDays} Days / {Math.max(1, durationDays - 1)} Nights</span>
          </div>

          {/* 3. Budget in INR */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-slate-800">
                Total Budget (INR ₹)
              </label>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                ~ {formatINR(perPersonPerDay)} / person / day
              </span>
            </div>

            <div className="relative">
              <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                min="1000"
                step="500"
                required
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-slate-900 text-sm font-semibold"
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {BUDGET_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setTotalBudget(preset)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    totalBudget === preset
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {formatINR(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Number of Travelers */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Number of Travelers
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { count: 1, label: 'Solo', icon: '👤' },
                { count: 2, label: 'Couple / Duo', icon: '👥' },
                { count: 4, label: 'Family (4)', icon: '👨‍👩‍👧‍👦' },
                { count: 6, label: 'Friends Group (6)', icon: '🎒' },
              ].map(item => (
                <button
                  type="button"
                  key={item.count}
                  onClick={() => setTravelersCount(item.count)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    travelersCount === item.count
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-xs font-semibold">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Travel Style */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Travel Style & Vibe
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POPULAR_STYLES.map(style => (
                <button
                  type="button"
                  key={style.id}
                  onClick={() => setTravelStyle(style.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    travelStyle === style.id
                      ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                    <span>{style.label}</span>
                    {travelStyle === style.id && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 6. Interests Multi-select */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              What are your key interests?
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_INTERESTS.map(interest => {
                const selected = selectedInterests.includes(interest);
                return (
                  <button
                    type="button"
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '} {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Special Notes */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Custom Notes or Special Preferences (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Pure vegetarian food only, early morning temple visits preferred, travelling with senior citizens"
              className="w-full p-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-slate-900 text-xs sm:text-sm"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating Personalized Indian Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Personalized Itinerary</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2.5">
              Powered by AI & curated Indian knowledge engine. All costs calculated in INR (₹).
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
