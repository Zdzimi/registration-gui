import { Time } from '@angular/common';
import { User } from './User';
import { Link } from './link';
import { DayTimetable } from './dayTimetable';
import { Place } from './place';

export interface Visit {

  visitTimeStart: Time;
  user: User;
  dayTimetable: DayTimetable;
  place: Place;
  links?: Array<Link>;
}
