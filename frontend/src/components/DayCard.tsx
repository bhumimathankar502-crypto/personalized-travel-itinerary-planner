import React, { useState } from 'react';
import { Calendar, Home, Plus, ChevronDown, ChevronUp, MapPin, IndianRupee } from 'lucide-react';
import { ItineraryDay, Activity } from '../types';
import { ActivityCard } from './ActivityCard';
import { formatINR } from '../utils/currency';
import { formatDateIndian } from '../utils/dates';

interface DayCardProps {
  day: ItineraryDay;
  onUpdateDay: (updatedDay: ItineraryDay) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, onUpdateDay }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAddingActivity, setIsAddingActivity] = useState(false);

  // New activity form state
  const [newTitle, setNewTitle] = useState('');
  const [newSlot, setNewSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Afternoon');
  const [newTime, setNewTime] = useState('14:00 - 16:00');
  const [newLocation, setNewLocation] = useState('');
  const [newCost, setNewCost] = useState(300);
  const [newDesc, setNewDesc] = useState('');

  const handleDeleteActivity = (actIndex: number) => {
    const updatedActivities = day.activities.filter((_, i) => i !== actIndex);
    const updatedDailyCost = updatedActivities.reduce((acc, a) => acc + (a.estimated_cost_inr || 0), 0) + (day.stay?.price_per_night_inr || 0);
    onUpdateDay({
      ...day,
      activities: updatedActivities,
      estimated_daily_cost_inr: updatedDailyCost
    });
  };

  const handleUpdateActivity = (actIndex: number, updated: Activity) => {
    const updatedActivities = [...day.activities];
    updatedActivities[actIndex] = updated;
    const updatedDailyCost = updatedActivities.reduce((acc, a) => acc + (a.estimated_cost_inr || 0), 0) + (day.stay?.price_per_night_inr || 0);
    onUpdateDay({
      ...day,
      activities: updatedActivities,
      estimated_daily_cost_inr: updatedDailyCost
    });
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAct: Activity = {
      id: `custom-act-${Date.now()}`,
      time_slot: newSlot,
      time_24h: newTime,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom added itinerary activity.',
      category: 'Sightseeing',
      location_name: newLocation.trim() || 'City Center',
      estimated_cost_inr: Number(newCost),
      duration_minutes: 120,
      transit_info: 'Local transit or auto',
      is_cost_estimated: true
    };

    const updatedActivities = [...day.activities, newAct];
    const updatedDailyCost = updatedActivities.reduce((acc, a) => acc + (a.estimated_cost_inr || 0), 0) + (day.stay?.price_per_night_inr || 0);

    onUpdateDay({
      ...day,
      activities: updatedActivities,
      estimated_daily_cost_inr: updatedDailyCost
    });

    setIsAddingActivity(false);
    setNewTitle('');
    setNewLocation('');
    setNewDesc('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow transition-all">
      {/* Day Banner Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white cursor-pointer select-none flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex flex-col items-center justify-center font-bold">
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider">Day</span>
            <span className="text-xl text-white">{day.day_number}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                {day.title}
              </h3>
            </div>
            {day.date && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{formatDateIndian(day.date)}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Estimated Day Cost</span>
            <span className="text-sm font-bold text-emerald-400">{formatINR(day.estimated_daily_cost_inr)}</span>
          </div>

          <div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expandable Day Content */}
      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Day Summary */}
          {day.summary && (
            <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed">
              <span className="font-semibold text-slate-800">Day Overview: </span>
              {day.summary}
            </p>
          )}

          {/* Stay / Accommodation Section */}
          {day.stay && (
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-emerald-600" />
                  Nightly Accommodation Recommendation
                </span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[11px]">
                  {formatINR(day.stay.price_per_night_inr)} / night (est.)
                </span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900">{day.stay.name}</h5>
                <p className="text-xs text-slate-600 mt-0.5">{day.stay.description || `${day.stay.type} in ${day.stay.location}`}</p>
                {day.stay.booking_advice && (
                  <p className="text-[11px] text-emerald-700 font-medium mt-1">
                    💡 Tip: {day.stay.booking_advice}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Activities List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Scheduled Activities & Experiences ({day.activities.length})
              </h4>
              <button
                onClick={() => setIsAddingActivity(!isAddingActivity)}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Activity</span>
              </button>
            </div>

            {/* Custom Activity Form */}
            {isAddingActivity && (
              <form onSubmit={handleAddActivity} className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-3 text-xs">
                <div className="font-bold text-slate-800">Add Custom Activity to Day {day.day_number}</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Activity title..."
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="p-2 border rounded bg-white text-xs sm:col-span-2"
                  />
                  <select
                    value={newSlot}
                    onChange={e => setNewSlot(e.target.value as any)}
                    className="p-2 border rounded bg-white text-xs"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Time slot (e.g. 14:00 - 16:00)"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="p-2 border rounded bg-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Location / Area..."
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="p-2 border rounded bg-white text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Cost in INR (₹)"
                    value={newCost}
                    onChange={e => setNewCost(Number(e.target.value))}
                    className="p-2 border rounded bg-white text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingActivity(false)}
                    className="px-3 py-1 rounded bg-slate-200 text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-emerald-600 text-white font-semibold"
                  >
                    Save Activity
                  </button>
                </div>
              </form>
            )}

            {/* Render Activities */}
            <div className="space-y-3">
              {day.activities.map((activity, actIdx) => (
                <ActivityCard
                  key={activity.id || actIdx}
                  activity={activity}
                  onDelete={() => handleDeleteActivity(actIdx)}
                  onUpdate={(updated) => handleUpdateActivity(actIdx, updated)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
