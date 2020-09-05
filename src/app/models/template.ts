import { Link } from './link';
import { Day } from './day';
import { YearAndMonth } from './yearAndMonth';

export interface Template {
  yearAndMonth: YearAndMonth;
  days: Array<Day>;
  visitTime: number;
  links?: Array<Link>;
}
