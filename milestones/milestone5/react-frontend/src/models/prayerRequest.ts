export interface PrayerRequestFormValue {
  title: string;
  description: string;
  category: string;
  priorityLevel: number;
  isAnswered: boolean;
}

export interface PrayerRequestPayload extends PrayerRequestFormValue {
  dateSubmitted: string;
}

export interface PrayerRequest extends PrayerRequestPayload {
  id: number;
}

interface PrayerRequestApiModel {
  id: number | string;
  title: string;
  description: string;
  category: string;
  dateSubmitted: string;
  isAnswered: boolean | number | string;
  priorityLevel: number | string;
}

export const CATEGORY_OPTIONS = ['Health', 'Family', 'Work', 'Ministry', 'Guidance', 'Other'];

export const PRIORITY_OPTIONS = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Urgent' },
  { value: 5, label: 'Critical' }
];

export const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'All Requests' },
  { value: 'active', label: 'Active' },
  { value: 'answered', label: 'Answered' }
];

export function normalizePrayerRequest(request: PrayerRequestApiModel): PrayerRequest {
  return {
    id: toNumber(request.id),
    title: request.title,
    description: request.description,
    category: request.category,
    dateSubmitted: normalizeDateSubmitted(request.dateSubmitted),
    isAnswered: toBoolean(request.isAnswered),
    priorityLevel: toNumber(request.priorityLevel)
  };
}

export function toStatusLabel(isAnswered: boolean): string {
  return isAnswered ? 'Answered' : 'Active';
}

export function toPriorityLabel(priorityLevel: number): string {
  return PRIORITY_OPTIONS.find((option) => option.value === priorityLevel)?.label ?? 'Unknown';
}

export function formatDisplayDate(dateSubmitted: string): string {
  const parsedDate = parsePrayerRequestDate(dateSubmitted);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateSubmitted;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(parsedDate);
}

export function normalizeDateSubmitted(dateSubmitted: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateSubmitted)) {
    return dateSubmitted;
  }

  const parsedDate = parsePrayerRequestDate(dateSubmitted);

  if (Number.isNaN(parsedDate.getTime())) {
    return dateSubmitted;
  }

  const year = parsedDate.getUTCFullYear();
  const month = `${parsedDate.getUTCMonth() + 1}`.padStart(2, '0');
  const day = `${parsedDate.getUTCDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function buildDefaultPrayerRequestFormValue(): PrayerRequestFormValue {
  return {
    title: '',
    description: '',
    category: CATEGORY_OPTIONS[0],
    priorityLevel: 1,
    isAnswered: false
  };
}

function toNumber(value: number | string): number {
  return typeof value === 'number' ? value : Number(value);
}

function toBoolean(value: boolean | number | string): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  return value === '1' || value.toLowerCase() === 'true';
}

function parsePrayerRequestDate(dateSubmitted: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateSubmitted)) {
    return new Date(`${dateSubmitted}T00:00:00`);
  }

  return new Date(dateSubmitted);
}