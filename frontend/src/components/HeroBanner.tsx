import React from 'react';
import { Sparkles, MapPin, Calendar, IndianRupee, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onQuickSelect: (destination: string) => void;
  onStartPlanning: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onQuickSelect, onStartPlanning }) => {
  const quickDestinations = [
    { name: 'Indore & Ujjain', tag: 'Food & Mahakal' },
    { name: 'Jaipur', tag: 'Royal Forts' },
    { name: 'Goa', tag: 'Beaches & Susegad' },
    { name: 'Varanasi', tag: 'Holy Ganga' },
    { name: 'Manali', tag: 'Snow Peaks' },
    { name: 'Kochi', tag: 'Backwaters' },
    { name: 'Bhopal', tag: 'Lakes & Sanchi' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 border-b border-slate-200 py-12 md:py-16">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute top-20 -left-12 w-80 h-80 rounded-full bg-teal-200/40 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>India-First Generative Travel Planner</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Intelligent, Day-by-Day Itineraries <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Tailored in Indian Rupees (₹)
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
          Plan seamlessly across India’s rich heritage, hill stations, and coastal retreats. 
          Get realistic hourly schedules, authentic local food stops, budget stay suggestions, and transit advice.
        </p>

        {/* Feature Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-700">
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-emerald-600" />
            <span>Exact INR Budget Breakdown</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>24-Hour Time-Slotted Days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Realistic Transit & Local Tips</span>
          </div>
        </div>

        {/* Quick Selection Pills */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Popular Indian Destinations to Explore:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickDestinations.map(dest => (
              <button
                key={dest.name}
                onClick={() => onQuickSelect(dest.name)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-700 hover:text-emerald-700 text-xs font-medium shadow-sm transition-all"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>{dest.name}</span>
                <span className="text-[10px] text-slate-400 group-hover:text-emerald-600">({dest.tag})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
