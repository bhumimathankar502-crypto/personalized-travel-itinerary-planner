import React from 'react';
import { IndianRupee, Home, Utensils, Compass, Bus, ShieldAlert, CheckCircle } from 'lucide-react';
import { CostBreakdown } from '../types';
import { formatINR } from '../utils/currency';

interface BudgetOverviewProps {
  breakdown: CostBreakdown;
  totalBudget: number;
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  breakdown,
  totalBudget
}) => {
  const estimatedTotal = breakdown.total_estimated_cost_inr || 1;
  const isUnderBudget = totalBudget >= estimatedTotal;
  const difference = Math.abs(totalBudget - estimatedTotal);

  const categories = [
    {
      label: 'Stay & Accommodation',
      amount: breakdown.accommodation_inr,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      icon: Home
    },
    {
      label: 'Food & Dining',
      amount: breakdown.food_dining_inr,
      color: 'bg-amber-500',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      icon: Utensils
    },
    {
      label: 'Sightseeing & Entry',
      amount: breakdown.activities_sightseeing_inr,
      color: 'bg-sky-500',
      textColor: 'text-sky-700',
      bgColor: 'bg-sky-50',
      icon: Compass
    },
    {
      label: 'Local Transit (Cab/Auto/Train)',
      amount: breakdown.local_transport_inr,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-700',
      bgColor: 'bg-indigo-50',
      icon: Bus
    },
    {
      label: 'Contingency / Buffer',
      amount: breakdown.miscellaneous_inr,
      color: 'bg-purple-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      icon: ShieldAlert
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
            <span>Trip Budget & Expense Breakdown</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Estimated in Indian Rupees (INR) for full itinerary duration
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Your Budget</span>
            <span className="text-lg font-bold text-slate-800">{formatINR(totalBudget)}</span>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Estimated Total</span>
            <span className="text-lg font-extrabold text-emerald-700">{formatINR(estimatedTotal)}</span>
          </div>
        </div>
      </div>

      {/* Budget Health Alert */}
      <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
        isUnderBudget 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      }`}>
        <div className="flex items-center gap-2 font-medium">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>
            {isUnderBudget
              ? `Comfortably within budget! Expected surplus of ${formatINR(difference)} for shopping or extras.`
              : `Slightly above planned budget by ${formatINR(difference)}. Consider budget stay or transport adjustments.`}
          </span>
        </div>
      </div>

      {/* Stacked Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
          {categories.map((c, i) => {
            const pct = Math.round((c.amount / estimatedTotal) * 100);
            return (
              <div
                key={i}
                style={{ width: `${pct}%` }}
                className={`${c.color} transition-all duration-500`}
                title={`${c.label}: ${formatINR(c.amount)} (${pct}%)`}
              />
            );
          })}
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {categories.map((c, i) => {
          const Icon = c.icon;
          const pct = Math.round((c.amount / estimatedTotal) * 100);
          return (
            <div key={i} className={`p-3 rounded-xl border border-slate-100 ${c.bgColor} space-y-1.5`}>
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${c.textColor}`} />
                <span className="text-[11px] font-bold text-slate-500">{pct}%</span>
              </div>
              <div className="text-[11px] font-medium text-slate-600 truncate">{c.label}</div>
              <div className="text-sm font-bold text-slate-900">{formatINR(c.amount)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
