import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-representatives-page',
  templateUrl: './representatives-page.component.html',
  styleUrls: ['./representatives-page.component.css']
})
export class RepresentativesPageComponent implements OnInit {

  representativesList: Array<User>;
  error;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('username') === null) {
        this.httpService.getRepresentativesPanel(params.get('institutionName')).subscribe(
          res => {
            this.representativesList = res;
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
        this.httpService.getRepresentatives(
          params.get('username'),
          params.get('institutionName')
        ).subscribe(
          res => this.representativesList = res,
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

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }

}
