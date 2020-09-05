import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LinkMaperService } from 'src/app/services/link-maper.service';
import { Template } from 'src/app/models/template';
import { HttpErrorResponse } from '@angular/common/http';
import { MonthTimetableAndErrors } from 'src/app/models/monthTimetableAndErrors';

@Component({
  selector: 'app-template-panel',
  templateUrl: './template-panel.component.html',
  styleUrls: ['./template-panel.component.css']
})
export class TemplatePanelComponent implements OnInit {

  templateSingleton: Array<Template>;
  timetableAndErrors: MonthTimetableAndErrors;
  emptyDays: Array<string> = [];
  templateNew: Template;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('day')) {
        this.httpService.getDayTemplate(
          params.get('institutionName'),
          params.get('representativeName'),
          params.get('year'),
          params.get('month'),
          params.get('day')
        ).subscribe(
          res => {
            this.templateSingleton = res;
            this.createTemplateNew();
          },
          err => {
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/']);
              } else if (err.status === 404) {
                this.error = err.error;
              }
            }
          }
        );
      } else if (params.get('month')) {
        this.httpService.getMonthTemplate(
          params.get('institutionName'),
          params.get('representativeName'),
          params.get('year'),
          params.get('month')
        ).subscribe(
          res => {
            this.templateSingleton = res;
            this.createTemplateNew();
          },
          err => {
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/']);
              } else if (err.status === 404) {
                this.error = err.error;
              }
            }
          }
        );
      } else {
        this.httpService.getNextTemplate(
          params.get('institutionName'),
          params.get('representativeName')
        ).subscribe(
          res => {
            this.templateSingleton = res;
            this.createTemplateNew();
          },
          err => {
            console.log(err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/']);
              } else if (err.status === 404) {
                this.error = err.error;
              }
            }
          }
        );
      }
    });
  }

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }

  createTemplateNew() {
    this.templateNew = {
      yearAndMonth: this.templateSingleton[0].yearAndMonth,
      days: this.templateSingleton[0].days,
      visitTime: this.templateSingleton[0].visitTime
    };
    this.getDate();
  }

  getDate() {
    const date: Date = new Date(
      this.templateNew.yearAndMonth.year,
      this.templateNew.yearAndMonth.month - 1,
      this.templateNew.days[0].dayNumber
    );
    const day = date.getDay();
    while (this.emptyDays.length < day - 1) {
      this.emptyDays.push(null);
    }
  }


  sendTemplate() {
    const url = this.templateSingleton[0].links.filter(x => x.rel.endsWith('szablon'))[0].href;
    console.log(url);
    this.httpService.sendTemplate(this.templateNew, url).subscribe(
      res => {
        this.timetableAndErrors = res;
        console.log(res);
      },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/']);
          } else if (err.status === 404) {
            this.error = err.error;
          }
        }
      }
    );
  }
}
