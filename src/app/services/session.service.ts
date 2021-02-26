import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginSession } from '../class/loginSession';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  static logOut() {
    localStorage.removeItem("login");
    sessionStorage.removeItem("login");
  }
  static getSession(): LoginSession {
    try {
      return JSON.parse(sessionStorage.getItem("login"))
    } catch (error) {
      return null
    }
  }
  constructor(private router: Router,) { }
  public logOn(session: LoginSession) {
    session.generateHash();
    sessionStorage.setItem('login', JSON.stringify(session))
    if (session.rememberMe) {
      localStorage.setItem('login', JSON.stringify(session))
    } else {
      sessionStorage.setItem('login', JSON.stringify(session))
    }
    this.router.navigate(['home']);
  }
  public isLogged(): boolean {
    return SessionService.getSession() != null
  }
}