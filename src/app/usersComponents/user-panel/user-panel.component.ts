import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LinkMaperService } from 'src/app/services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  userSingleton: Array<User>;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getUserSingleton(params.get('institutionName'), params.get('username')).subscribe(
        res => this.userSingleton = res,
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

  modifyLink(link: string): string {
    return this.linkMapperService.mapLink(link);
  }
}
