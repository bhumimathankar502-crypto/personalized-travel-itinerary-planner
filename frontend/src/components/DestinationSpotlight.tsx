import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, IndianRupee, ArrowRight, Search, Sparkles } from 'lucide-react';
import { DestinationInfo } from '../types';
import { fetchDestinations } from '../services/api';
import { formatINR } from '../utils/currency';

interface DestinationSpotlightProps {
  onSelectDestination: (destinationName: string) => void;
}

export const DestinationSpotlight: React.FC<DestinationSpotlightProps> = ({
  onSelectDestination
}) => {
  const [destinations, setDestinations] = useState<DestinationInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations()
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/70 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Indian Travel Circuits
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Trending Indian Destinations
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Select an iconic destination to instantly plan your itinerary with verified attractions, food hotspots, and realistic INR budgets.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by city, state, or tag..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-72 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(dest => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image_url}
                  alt={dest.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* State Tag */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                  {dest.state}
                </div>

                {/* Bottom title & tagline on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xl font-black tracking-tight">{dest.name}</h3>
                  <p className="text-xs text-slate-200 line-clamp-1">{dest.tagline}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {dest.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Best time: <strong className="text-slate-800">{dest.best_time_to_visit}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Avg Daily: <strong className="text-slate-800">{formatINR(dest.average_daily_budget_inr)} / day</strong></span>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onSelectDestination(dest.name)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors group/btn shadow-sm"
                >
                  <span>Plan Trip to {dest.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
