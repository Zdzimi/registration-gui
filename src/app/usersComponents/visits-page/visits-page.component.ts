import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Visit } from 'src/app/models/visit';

@Component({
  selector: 'app-visits-page',
  templateUrl: './visits-page.component.html',
  styleUrls: ['./visits-page.component.css']
})
export class VisitsPageComponent implements OnInit {

  visitsList: Array<Visit>;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getVisitsList(params.get('username')).subscribe(
        res => {
          console.log(res);
          this.visitsList = res;
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            } else if (err.status === 404) {
              this.error = err.error;
            }
          }
          console.log(err);
        }
      );
    });
  }

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }

}
