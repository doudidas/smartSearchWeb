import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {

  title = 'smartSearchWeb';
  constructor(public router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    if (! this.cookieService.check('login')) {
      this.router.navigate(['login']);
    }
  }
}
