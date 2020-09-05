import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LinkMaperService } from 'src/app/services/link-maper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.css']
})
export class UsersPanelComponent implements OnInit {

  usersList: Array<User>;
  error: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private linkMapperService: LinkMaperService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.httpService.getUsers(params.get('institutionName')).subscribe(
        res => this.usersList = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/']);
            } else if (err.status === 404) {
              this.error = err.error;
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
