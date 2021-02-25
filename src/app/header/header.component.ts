import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import { LoginSession } from '../class/loginSession';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  session: LoginSession
  constructor(public router: Router, private sessionService: SessionService) { }

  async ngOnInit() {
    ClarityIcons.addIcons(userIcon);
    if (this.sessionService.isLogged()) {
      this.session = SessionService.getSession()
    }
  }

  logOut() {
    SessionService.logOut();
    this.router.navigate(['/login']);
  }
}
