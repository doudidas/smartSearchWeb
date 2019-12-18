import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from '../class/user';
import { UserComponent } from '../admin/user/user.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: string;
  constructor(private cookieService: CookieService, public router: Router, private apiService: ApiService) {
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
