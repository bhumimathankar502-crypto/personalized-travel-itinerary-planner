/**
 * Indian Rupee (INR) Currency Formatting Utilities
 * Strictly enforces en-IN locale and ₹ symbol.
 */

export function formatINR(amount: number | string | undefined | null): string {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '₹0';
  }
  const numeric = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numeric);
}

export function formatINRLakhs(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(amount);
}

export function calculatePerDayPerPerson(total: number, days: number, travelers: number): number {
  const divisor = Math.max(1, days * travelers);
  return Math.round(total / divisor);
}
