import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LinkMaperService } from '../../services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Institution } from 'src/app/models/institution';

@Component({
  selector: 'app-institution-page',
  templateUrl: './institution-page.component.html',
  styleUrls: ['./institution-page.component.css']
})
export class InstitutionPageComponent implements OnInit {

  institutionSingl: Array<Institution>;
  error: string;
  errorAdding: string;
  isItRepresentativesPanel = false;
  addingRepresentativePanelVisible = false;
  addingRepresentativeUsername = '';
  institutionName: string;
  addingSuccessMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMaper: LinkMaperService
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.toString().startsWith(`Route(url:'registration-app/`)) {
      this.activatedRoute.paramMap.subscribe(params => {
        this.institutionName = params.get('institutionName');
        this.httpService.getInstitutionPanel(params.get('institutionName')).subscribe(
          res => {
            this.isItRepresentativesPanel = true;
            this.institutionSingl = res;
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
        this.httpService.getInstitution(params.get('username'), params.get('institutionName')).subscribe(
          res => this.institutionSingl = res,
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
    return this.linkMaper.mapLink(link);
  }

  showAddingPanel() {
    this.addingRepresentativePanelVisible = true;
  }

  addRepresentative() {
    this.httpService.addRepresentative(this.institutionName, this.addingRepresentativeUsername).subscribe(
      res => {
        this.addingSuccessMessage = 'Dodano: ' + this.addingRepresentativeUsername;
        this.addingRepresentativeUsername = '';
        this.addingRepresentativePanelVisible = false;
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.errorAdding = err.error;
          }
        }
      }
    );
  }

  cancel() {
    this.addingRepresentativePanelVisible = false;
  }

}
