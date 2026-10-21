import React, { useState } from 'react';
import { X, Printer, Copy, Check, Share2, Compass, ShieldCheck } from 'lucide-react';
import { Trip } from '../types';
import { formatINR } from '../utils/currency';
import { formatDateIndian } from '../utils/dates';

interface ExportShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
}

export const ExportShareModal: React.FC<ExportShareModalProps> = ({
  isOpen,
  onClose,
  trip
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getPlainTextSummary = () => {
    let text = `========================================\n`;
    text += `🇮🇳 TRAVEL ITINERARY: ${trip.title.toUpperCase()}\n`;
    text += `========================================\n`;
    text += `📍 Destination: ${trip.destination}, ${trip.state_or_country}\n`;
    text += `📅 Dates: ${formatDateIndian(trip.start_date)} - ${formatDateIndian(trip.end_date)} (${trip.duration_days} Days)\n`;
    text += `👥 Travelers: ${trip.travelers_count} | Style: ${trip.travel_style}\n`;
    text += `💰 Planned Budget: ${formatINR(trip.total_budget_inr)} | Estimated Cost: ${formatINR(trip.estimated_cost_inr)}\n\n`;

    trip.days.forEach(day => {
      text += `----------------------------------------\n`;
      text += `DAY ${day.day_number}: ${day.title} (${formatDateIndian(day.date)})\n`;
      text += `----------------------------------------\n`;
      if (day.stay) {
        text += `🏨 Stay: ${day.stay.name} (~${formatINR(day.stay.price_per_night_inr)}/night)\n`;
      }
      day.activities.forEach(act => {
        text += `• [${act.time_slot} | ${act.time_24h}] ${act.title} - ${act.location_name} (~${formatINR(act.estimated_cost_inr)})\n`;
        text += `  Transit: ${act.transit_info || 'Local auto/cab'}\n`;
      });
      text += `\n`;
    });

    text += `========================================\n`;
    text += `Generated with YatraAI - Personalized Indian Travel Planner\n`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getPlainTextSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Export & Share Itinerary</h3>
              <p className="text-xs text-slate-500">Print to PDF or copy for WhatsApp & travel companions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex flex-col items-center justify-center gap-2 transition-all group"
            >
              <Printer className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900">Print or Save as PDF</span>
              <span className="text-[11px] text-slate-500 text-center">Clean browser printer view</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 flex flex-col items-center justify-center gap-2 transition-all group"
            >
              {copied ? (
                <Check className="w-6 h-6 text-emerald-600" />
              ) : (
                <Copy className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              )}
              <span className="font-bold text-slate-900">
                {copied ? 'Copied to Clipboard!' : 'Copy Summary'}
              </span>
              <span className="text-[11px] text-slate-500 text-center">Perfect for WhatsApp / Notes</span>
            </button>
          </div>

          {/* India Travel Essentials Checklist */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              India Travel Checklist & Tips
            </h5>
            <ul className="list-disc list-inside text-xs space-y-1 text-slate-600">
              <li>Carry government photo ID (Aadhaar / Voter ID / Passport) for hotel & monument check-ins.</li>
              <li>Keep UPI apps (Google Pay, PhonePe, Paytm) active for instant digital payments across India.</li>
              <li>Pre-book railway tickets via IRCTC and temple darshan passes for rush hours.</li>
              <li>Wear slip-on shoes or socks for easy removal when entering temples and religious shrines.</li>
            </ul>
          </div>

          {/* Preview Box */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Preview Text:</span>
            <pre className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] max-h-40 overflow-y-auto whitespace-pre-wrap">
              {getPlainTextSummary()}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
