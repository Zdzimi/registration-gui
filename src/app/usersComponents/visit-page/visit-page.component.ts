import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Visit } from 'src/app/models/visit';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-visit-page',
  templateUrl: './visit-page.component.html',
  styleUrls: ['./visit-page.component.css']
})
export class VisitPageComponent implements OnInit {

  visitSing: Array<Visit>;
  error: string;
  errorBook: string;
  navigateUrlAfterDelete: string;
  navigateUrlAfterBook: string;
  navigateUrlAfterCancel: string;
  visitBooked: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.toString().startsWith(`Route(url:'registration-app/`)) {
      this.activatedRoute.paramMap.subscribe(params => {
        if (params.get('day')) {
          this.httpService.getVisitSingleton(
            params.get('institutionName'),
            params.get('representativeName'),
            params.get('year'),
            params.get('month'),
            params.get('day'),
            params.get('visitId')
          ).subscribe(
            res => {
              this.visitSing = res;
              this.navigateUrlAfterDelete = `registration-app/${params.get('institutionName')}/representatives/${params.get('representativeName')}/timetables/y/${params.get('year')}/m/${params.get('month')}/d/${params.get('day')}`;
              this.setVisitBooked();
            },
            err => {
              console.log(err);
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
          this.httpService.getUsersVisitSingleton(
            params.get('institutionName'),
            params.get('username'),
            params.get('visitId')
          ).subscribe(
            res => {
              this.visitSing = res;
              this.setVisitBooked();
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
        }
      });
    } else {
      this.activatedRoute.paramMap.subscribe(params => {
        if (params.get('day')) {
          this.httpService.getBookVisit(
            params.get('username'),
            params.get('institutionName'),
            params.get('representativeName'),
            params.get('yearmonth'),
            params.get('day'),
            params.get('visitId')
          ).subscribe(
            res => {
              this.visitSing = res;
              this.setVisitBooked();
              this.navigateUrlAfterBook = `/registration/${params.get('username')}/visits/${params.get('visitId')}`;
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
        } else {
          this.httpService.getVisit(params.get('username'), params.get('visitId')).subscribe(
            res => {
              this.visitSing = res;
              this.setVisitBooked();
              this.navigateUrlAfterCancel = `/registration/${params.get('username')}/visits`;
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
        }
      });
    }
  }

  setVisitBooked() {
    this.visitBooked = !!this.visitSing[0].user;
  }

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }

  click(link: Link) {
    if (link.rel === 'rezygnuj') {
      this.httpService.cancelVisit(link.href).subscribe(
        res => this.router.navigate([this.navigateUrlAfterCancel]),
        err => this.error = err.error
      );
    } else if (link.rel === 'rezerwuj') {
      this.httpService.bookVisit(link.href).subscribe(
        res => this.router.navigate([this.navigateUrlAfterBook]),
        err => this.errorBook = err
      );
    } else if (link.rel === 'usuń wizytę') {
      this.httpService.deleteVisit(link.href).subscribe(
        res => this.router.navigate([this.navigateUrlAfterDelete]),
        err => this.errorBook = err
      );
    } else {
      const url = this.modifyLink(link.href);
      this.router.navigate([url]);
    }
  }
}
