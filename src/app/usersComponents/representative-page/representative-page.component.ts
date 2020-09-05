import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-representative-page',
  templateUrl: './representative-page.component.html',
  styleUrls: ['./representative-page.component.css']
})
export class RepresentativePageComponent implements OnInit {

  representativeSing: Array<User>;
  error;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get('username') === null) {
        this.httpService.getRepresentativePanel(
          params.get('institutionName'),
          params.get('representativeName')
        ).subscribe(
          res => this.representativeSing = res,
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
        this.httpService.getRepresentative(
          params.get('username'),
          params.get('institutionName'),
          params.get('representativeName')
        ).subscribe(
          res => this.representativeSing = res,
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

