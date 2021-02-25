import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSession } from './class/loginSession';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  session: LoginSession
  title = 'smartSearchWeb';
  constructor(public router: Router, private sessionService: SessionService) {
  }

  async ngOnInit() {
    if (!this.sessionService.isLogged()) {
      this.router.navigate(['login'])
    }
  }
}
