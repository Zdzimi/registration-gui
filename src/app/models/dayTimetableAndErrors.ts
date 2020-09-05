import { Visit } from './visit';

export interface DayTimetableAndErrors {
  dayOfMonth: number;
  visits: Array<Visit>;
  errors: Array<string>;
}
