import { DayTimetableAndErrors } from './dayTimetableAndErrors';

export interface MonthTimetableAndErrors {
  year: number;
  month: number;
  dayTimetableAndErrors: Array<DayTimetableAndErrors>;
}
