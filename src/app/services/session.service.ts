import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSession } from '../class/loginSession';

// Who can call this service
@Injectable({
  providedIn: 'root'
})

export class SessionService {

  // Minimal Constructor with router only
  constructor(private router: Router,) { }

  // Static function are use to avoid manipulating a local SessionService Variable.

  // Function to remove User information from both session and local Cache 
  static logOut() {
    localStorage.removeItem("login");
    sessionStorage.removeItem("login");
  }

  // Funciton to get User Informations form session cache
  // return null if no session found !
  static getSession(): LoginSession {
    try {
      return JSON.parse(sessionStorage.getItem("login"))
    } catch (error) {
      return null
    }
  }

  /* function to store login info in cache.
    Local Storage persist with differents tabs and when navigator is terminated
    Session Storage is different per tabs and is whiped with navigator shutdow
  */
  public logOn(session: LoginSession) {
    // we store with Hashed password
    session.generateHash();

    if (session.rememberMe) {
      localStorage.setItem('login', JSON.stringify(session))
    }

    sessionStorage.setItem('login', JSON.stringify(session))

    this.router.navigate(['home']);
  }
  // check if the user is logged
  public isLogged(): boolean {
    return SessionService.getSession() != null
  }
}
