import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn;

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) {
    this.authService.getLoggedInObs().subscribe((value: boolean) => {
      this.loggedIn = value;
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.clearCredentials();
    this.router.navigate(['/']);
  }

}
