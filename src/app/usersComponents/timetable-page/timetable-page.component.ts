import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LinkMaperService } from 'src/app/services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MonthTimetable } from 'src/app/models/monthTimetable';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-timetable-page',
  templateUrl: './timetable-page.component.html',
  styleUrls: ['./timetable-page.component.css']
})
export class TimetablePageComponent implements OnInit {

  timetableSingle: Array<MonthTimetable>;
  emptyDays: Array<string> = [];
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
        this.httpService.getTimetablePanelSing(
          params.get('institutionName'),
          params.get('representativeName'),
          params.get('year'),
          params.get('month')
        ).subscribe(
          res => {
            this.timetableSingle = res;
            this.create();
          },
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
        this.httpService.getTimetableSing(
          params.get('username'),
          params.get('institutionName'),
          params.get('representativeName'),
          params.get('yearmonth')
        ).subscribe(
          res => {
            this.timetableSingle = res;
            this.create();
          },
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

  create() {
    const date: Date = new Date(
      this.timetableSingle[0].year,
      this.timetableSingle[0].month - 1,
      parseInt(this.timetableSingle[0].links[0].rel, 10)
    );
    const dayOfWeek = date.getDay();
    while (this.emptyDays.length < dayOfWeek - 1) {
      this.emptyDays.push(null);
    }
  }

  setClass(link: Link) {
    if (parseInt(link.rel, 10) && !link.rel.endsWith('szablon')) {
      return 'day';
    } else {
      return 'link';
    }
  }
}
