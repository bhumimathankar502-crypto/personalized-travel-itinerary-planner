import React, { useState } from 'react';
import { X, IndianRupee, Plus, Trash2, PieChart, CheckCircle2, AlertCircle } from 'lucide-react';
import { Trip, ExpenseItem } from '../types';
import { formatINR } from '../utils/currency';
import { getTodayString } from '../utils/dates';

interface ExpenseTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip;
  onUpdateTrip: (updated: Trip) => void;
}

export const ExpenseTrackerModal: React.FC<ExpenseTrackerModalProps> = ({
  isOpen,
  onClose,
  trip,
  onUpdateTrip
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseItem['category']>('Food');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const actualExpenses = trip.actual_expenses || [];
  const totalActualSpent = actualExpenses.reduce((acc, item) => acc + item.amount_inr, 0);
  const plannedBudget = trip.total_budget_inr;
  const remainingBudget = plannedBudget - totalActualSpent;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numericAmount) || numericAmount <= 0) return;

    const newExpense: ExpenseItem = {
      id: `expense-${Date.now()}`,
      title: title.trim(),
      category,
      amount_inr: numericAmount,
      date: getTodayString(),
      notes: notes.trim() || undefined
    };

    const updatedList = [newExpense, ...actualExpenses];
    onUpdateTrip({
      ...trip,
      actual_expenses: updatedList
    });

    setTitle('');
    setAmount('');
    setNotes('');
  };

  const handleDeleteExpense = (expenseId: string) => {
    const updatedList = actualExpenses.filter(e => e.id !== expenseId);
    onUpdateTrip({
      ...trip,
      actual_expenses: updatedList
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Trip Expense Ledger (INR ₹)</h3>
              <p className="text-xs text-slate-500">Track real expenses incurred during your journey</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview Banner */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Planned Budget</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-800">{formatINR(plannedBudget)}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Spent</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-600">{formatINR(totalActualSpent)}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Remaining</span>
            <span className={`text-sm sm:text-base font-extrabold ${remainingBudget >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
              {formatINR(remainingBudget)}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Add Expense Form */}
          <form onSubmit={handleAddExpense} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-3">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Log New Expense</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <input
                type="text"
                required
                placeholder="Expense title (e.g. Sarafa street food)"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="p-2 border rounded-lg bg-white text-xs sm:col-span-2"
              />
              <div className="relative">
                <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  required
                  placeholder="Amount (₹)"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full pl-7 pr-2 py-2 border rounded-lg bg-white text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="p-2 border rounded-lg bg-white text-xs font-medium"
              >
                <option value="Food">Food & Dining</option>
                <option value="Stay">Stay & Hotel</option>
                <option value="Sightseeing">Sightseeing & Entry</option>
                <option value="Transport">Transport / Taxi / Auto</option>
                <option value="Shopping">Shopping & Handicrafts</option>
                <option value="Misc">Miscellaneous</option>
              </select>

              <input
                type="text"
                placeholder="Optional notes or bill memo..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="p-2 border rounded-lg bg-white text-xs sm:col-span-2"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Record Expense</span>
              </button>
            </div>
          </form>

          {/* Expenses Log Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Recorded Expenses ({actualExpenses.length})
            </h4>

            {actualExpenses.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center">
                No actual expenses logged yet. Add your receipts and daily spends above!
              </p>
            ) : (
              <div className="space-y-2 divide-y divide-slate-100">
                {actualExpenses.map(item => (
                  <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{item.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.category} • {item.date} {item.notes ? `• ${item.notes}` : ''}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-900">{formatINR(item.amount_inr)}</span>
                      <button
                        onClick={() => handleDeleteExpense(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
