import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MonthTimetable } from 'src/app/models/monthTimetable';

@Component({
  selector: 'app-timetables-page',
  templateUrl: './timetables-page.component.html',
  styleUrls: ['./timetables-page.component.css']
})
export class TimetablesPageComponent implements OnInit {

  timetablesList: Array<MonthTimetable>;
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
        if (params.get('year')) {
          this.httpService.getTimetablesPanelByYear(
            params.get('institutionName'),
            params.get('representativeName'),
            params.get('year')
          ).subscribe(
            res => this.timetablesList = res,
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
        } else {
          this.httpService.getTimetablesPanel(
            params.get('institutionName'),
            params.get('representativeName')
          ).subscribe(
            res => this.timetablesList = res,
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
        }
      });
    } else {
      this.activatedRoute.paramMap.subscribe(params => {
        this.httpService.getTimetables(
          params.get('username'),
          params.get('institutionName'),
          params.get('representativeName')
        ).subscribe(
          res => this.timetablesList = res,
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
