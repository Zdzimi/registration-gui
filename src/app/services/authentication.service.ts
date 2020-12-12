import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn = false;
  loggedUsername = '';
  loggedInObs = new BehaviorSubject<boolean>(this.loggedIn);
  loggedUsernameObs = new BehaviorSubject<string>(this.loggedUsername);

  constructor() {
    this.loggedIn = localStorage.getItem('auth') !== null;
    this.loggedUsername = localStorage.getItem('username');
    this.loggedInObs.next(this.loggedIn);
    this.loggedUsernameObs.next(this.loggedUsername);
  }

  getLoggedInObs(): Observable<boolean> {
    return this.loggedInObs.asObservable();
  }

  getLoggedUsernameObs(): Observable<string> {
    return this.loggedUsernameObs.asObservable();
  }

  setCredentials(username: string, password: string) {
    localStorage.setItem('auth', btoa(username + ':' + password));
    localStorage.setItem('username', username);
    this.loggedIn = true;
    this.loggedInObs.next(this.loggedIn);
    this.loggedUsernameObs.next(this.loggedUsername);
  }

  createBasicAuth() {
    return 'Basic ' + localStorage.getItem('auth');
  }

  clearCredentials() {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    this.loggedIn = false;
    this.loggedUsername = null;
    this.loggedInObs.next(this.loggedIn);
    this.loggedUsernameObs.next(this.loggedUsername);
  }
}
