import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserNew } from 'src/app/models/userNew';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  username: string;
  password: string;
  user = new UserNew();
  loginView = true;
  errorLogin: string;
  errorRegistry: string;

  constructor(
    private authService: AuthenticationService,
    private httpService: HttpService,
    private router: Router
    ) { }

  ngOnInit(): void {
    const loggedUsername = localStorage.getItem('username');
    if (loggedUsername !== null) {
      this.router.navigate(['/registration/' + loggedUsername]);
    }
  }

  showLogin() {
    this.loginView = true;
  }

  showRegistry() {
    this.loginView = false;
  }

  login() {
    this.authService.setCredentials(this.username, this.password);
    this.httpService.getUser(this.username).subscribe(
      res => {
        this.router.navigate(['/registration/' + this.username]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.errorLogin = 'Złe dane';
          }
        }
        this.authService.clearCredentials();
      }
    );
  }

  registry() {
    this.httpService.registry(this.user).subscribe(
      res => {
        this.authService.setCredentials(this.user.username, this.user.password);
        this.router.navigate(['/registration/' + this.user.username]);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            this.errorRegistry = 'Nazwa użytkownika już istnieje';
          }
        }
      }
    );
  }

}
