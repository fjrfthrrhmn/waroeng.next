import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format number to IDR with dot separator
export function formatPrice(value: number | string): string {
  const num = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;
  if (isNaN(num)) return '';
  return num.toLocaleString('id-ID');
}

// Parse formatted string back to number
export function parsePrice(value: string): number {
  const numeric = value.replace(/\D/g, '');
  return parseInt(numeric, 10) || 0;
}
