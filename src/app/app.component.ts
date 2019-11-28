import { Component, Injectable, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { GeneralService } from './services/general.service';
import { CookieService } from 'ngx-cookie-service';
import { UUID } from 'angular2-uuid';

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
  }
}
