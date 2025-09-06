export interface FetchSchedule {
  interval: 'daily' | 'weekly';
  time: string; // e.g., '08:00'
}
