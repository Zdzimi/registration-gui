import { Time } from '@angular/common';

export interface Day {
  dayNumber: number;
  placeName: string;
  timeStart: Time;
  timeEnd: Time;
}
