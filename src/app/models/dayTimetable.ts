import { MonthTimetable } from './monthTimetable';
import { Link } from './link';

export interface DayTimetable {

  dayOfMonth: number;
  monthTimetable: MonthTimetable;
  links: Array<Link>;
}

