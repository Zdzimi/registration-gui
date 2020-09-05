import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LinkMaperService } from 'src/app/services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DayTimetable } from 'src/app/models/dayTimetable';

@Component({
  selector: 'app-day-timetable-page',
  templateUrl: './day-timetable-page.component.html',
  styleUrls: ['./day-timetable-page.component.css']
})
export class DayTimetablePageComponent implements OnInit {

  dayTimetableSingl: Array<DayTimetable>;
  error;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.toString().startsWith(`Route(url:'registration-app/`)) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.httpService.getDaytimetablePanel(
          params.get('institutionName'),
          params.get('representativeName'),
          params.get('year'),
          params.get('month'),
          params.get('day')
        ).subscribe(
          res => this.dayTimetableSingl = res,
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 404) {
                this.error = err.error;
              } else if (err.status === 401) {
                this.router.navigate(['/']);
              }
            }
          }
        );
      });
    } else {
      this.activatedRoute.paramMap.subscribe(params => {
        this.httpService.getDaytimetable(
          params.get('username'),
          params.get('institutionName'),
          params.get('representativeName'),
          params.get('yearmonth'),
          params.get('day')
        ).subscribe(
          res => this.dayTimetableSingl = res,
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 404) {
                this.error = err.error;
              } else if (err.status === 401) {
                this.router.navigate(['/']);
              }
            }
          }
        );
      });
    }
  }

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }
}
