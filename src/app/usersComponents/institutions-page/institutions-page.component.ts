import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Institution } from 'src/app/models/institution';

@Component({
  selector: 'app-institutions-page',
  templateUrl: './institutions-page.component.html',
  styleUrls: ['./institutions-page.component.css']
})
export class InstitutionsPageComponent implements OnInit {

  institutionsList: Array<Institution>;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMaper: LinkMaperService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      if (this.activatedRoute.toString().endsWith(`know')`)) {
        this.httpService.getKnowedInstitutions(params.get('username')).subscribe(
          res => this.institutionsList = res,
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
      } else {
        this.httpService.getInstitutions(params.get('username')).subscribe(
          res => this.institutionsList = res,
          err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.router.navigate(['/']);
              }
            }
            console.log(err);
          }
        );
      }
    });
  }

  modifyLink(link: string): string {
    return this.linkMaper.mapLink(link);
  }

}
