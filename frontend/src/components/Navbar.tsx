import React from 'react';
import { Compass, BookmarkCheck, PlusCircle, Sparkles, MapPin, Activity } from 'lucide-react';
import { HealthStatus } from '../types';

interface NavbarProps {
  onNewTrip: () => void;
  onOpenSaved: () => void;
  onExploreClick: () => void;
  savedCount: number;
  health: HealthStatus | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewTrip,
  onOpenSaved,
  onExploreClick,
  savedCount,
  health
}) => {
  const isHealthy = health?.status === 'healthy';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={onNewTrip}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Yatra<span className="text-emerald-600">AI</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                INDIA 🇮🇳
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Personalized Travel Itinerary Planner</p>
          </div>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={onExploreClick}
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 transition-colors"
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            Top Destinations
          </button>
          
          <button
            onClick={onOpenSaved}
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 transition-colors relative"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-500" />
            Saved Itineraries
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-emerald-600 text-white">
                {savedCount}
              </span>
            )}
          </button>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs">
            <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 animate-ping' : 'bg-blue-500'}`} />
            <span className="text-slate-600 font-medium">
              {isHealthy ? 'Backend Live' : 'Offline / Standalone'}
            </span>
          </div>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSaved}
            className="md:hidden p-2 text-slate-600 hover:text-emerald-600 relative"
            title="Saved Trips"
          >
            <BookmarkCheck className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onNewTrip}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>
    </header>
  );
};
