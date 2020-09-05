import { User } from './User';
import { Institution } from './institution';
import { Link } from './link';

export interface MonthTimetable {

  year: number;
  month: number;
  representative: User;
  institution: Institution;
  links: Array<Link>;
}
