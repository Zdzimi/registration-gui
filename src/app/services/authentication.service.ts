import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn: boolean;
  loggedInObs = new BehaviorSubject<boolean>(this.loggedIn);

  constructor() {
    this.loggedIn = false;
    this.loggedInObs.next(this.loggedIn);
  }

  getLoggedInObs(): Observable<boolean> {
    return this.loggedInObs.asObservable();
  }

  setCredentials(username: string, password: string) {
    localStorage.setItem('auth', username + ':' + password);
    this.loggedIn = true;
    this.loggedInObs.next(this.loggedIn);
  }

  createBasicAuth() {
    return 'Basic ' + btoa(localStorage.getItem('auth'));
  }

  clearCredentials() {
    localStorage.removeItem('auth');
    this.loggedIn = false;
    this.loggedInObs.next(this.loggedIn);
  }
}
