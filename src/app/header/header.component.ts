import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: string;
  constructor(private cookieService: CookieService, public router: Router) {
  }

  async ngOnInit() {
    const cookie = this.cookieService.get('login');
    this.currentUser = JSON.parse(cookie).username;
  }

  logOut() {
    this.currentUser = null;
    this.cookieService.delete('login', '/');
    this.router.navigate(['login']);
  }
}
