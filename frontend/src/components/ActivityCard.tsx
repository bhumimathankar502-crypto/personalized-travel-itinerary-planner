import React, { useState } from 'react';
import { Clock, MapPin, Bus, IndianRupee, Trash2, Edit2, Check, X } from 'lucide-react';
import { Activity } from '../types';
import { formatINR } from '../utils/currency';

interface ActivityCardProps {
  activity: Activity;
  onDelete?: () => void;
  onUpdate?: (updated: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(activity.title);
  const [editTime, setEditTime] = useState(activity.time_24h);
  const [editCost, setEditCost] = useState(activity.estimated_cost_inr);
  const [editTransit, setEditTransit] = useState(activity.transit_info || '');

  const slotColors: Record<string, { bg: string; text: string; border: string }> = {
    Morning: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    Afternoon: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
    Evening: { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-200' },
    Night: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' }
  };

  const slotStyle = slotColors[activity.time_slot] || slotColors.Morning;

  const handleSave = () => {
    if (onUpdate) {
      onUpdate({
        ...activity,
        title: editTitle,
        time_24h: editTime,
        estimated_cost_inr: Number(editCost),
        transit_info: editTransit
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-50/70 hover:bg-white border border-slate-200 rounded-xl p-4 sm:p-5 transition-all shadow-sm hover:shadow-md space-y-3">
      {/* Top Row: Time Slot & Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${slotStyle.bg} ${slotStyle.text} ${slotStyle.border}`}>
            {activity.time_slot}
          </span>
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {isEditing ? (
              <input
                type="text"
                value={editTime}
                onChange={e => setEditTime(e.target.value)}
                className="px-1.5 py-0.5 text-xs border rounded bg-white"
              />
            ) : (
              activity.time_24h
            )}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                title="Save changes"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {onUpdate && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded"
                  title="Edit activity"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                  title="Delete activity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <div>
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            className="w-full px-2 py-1 text-sm font-bold border rounded bg-white mb-2"
          />
        ) : (
          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {activity.title}
          </h4>
        )}
        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
          {activity.description}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
        <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
        <span className="truncate">{activity.location_name}</span>
      </div>

      {/* Transit Information */}
      {(activity.transit_info || isEditing) && (
        <div className="flex items-start gap-1.5 p-2 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-600">
          <Bus className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
          {isEditing ? (
            <input
              type="text"
              value={editTransit}
              onChange={e => setEditTransit(e.target.value)}
              placeholder="Transit info..."
              className="w-full px-1 text-xs border rounded"
            />
          ) : (
            <span>Transit: {activity.transit_info}</span>
          )}
        </div>
      )}

      {/* Footer: Category & Cost */}
      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
        <span className="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 font-medium text-[11px]">
          {activity.category}
        </span>

        <div className="flex items-center gap-1 font-bold text-slate-900">
          <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
          {isEditing ? (
            <input
              type="number"
              value={editCost}
              onChange={e => setEditCost(Number(e.target.value))}
              className="w-20 px-1 text-xs border rounded"
            />
          ) : (
            <span>{formatINR(activity.estimated_cost_inr)}</span>
          )}
          <span className="text-[10px] text-slate-400 font-normal">(est.)</span>
        </div>
      </div>
    </div>
  );
};
