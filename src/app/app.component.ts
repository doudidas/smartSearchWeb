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
  columns;
  activeColum: number;
  showError: boolean;
  alertAppError: string;
  loading: boolean;
  logged: boolean;
  displayForm: boolean;
  currentUser: string;
  submitted: boolean;
  form: any;
  formError: string;
  errorUser: boolean;
  errorPassword: boolean;
  title = 'smartSearchWeb';


  constructor(public router: Router, private api: ApiService, private service: GeneralService, private cookieService: CookieService) {
    this.submitted = false;
    this.displayForm = false;
  }

  private async init() {
    this.logged = this.cookieService.check('login');
    if (!this.logged) {
      this.form = { username: null, password: null, userType: 'user', rememberme: false };
      this.router.navigate(['']);
    } else {
      const cookie = this.cookieService.get('login');
      this.currentUser = JSON.parse(cookie).username;
      // this.router.navigate(['home']);
    }
    while (true) {
      await this.checkServer();
      const timer = (this.showError) ? 1000 * 5 : 1000 * 60;
      await this.service._delay(timer);
    }
  }

  public async checkServer(): Promise<void> {
    console.log(new Date() + 'Running healthcheck: ');
    const message = await this.api.checkHealth();
    this.togglePanel((message == null), message);
  }

  async ngOnInit() {
    this.init();
  }

  userCheck(): void {
    this.checkServer();
  }
  togglePanel(show: boolean, message: string) {
    if (show) {
      this.loading = false;
      this.showError = false;
    } else {
      this.loading = false;
      this.showError = true;
      this.alertAppError = message;
    }
  }
  showForm() {
    this.displayForm = true;
  }
  logAsGuest() {
    this.logAsUser('guest');
  }

  logAsUser(username) {
    const cookie = JSON.stringify({ username, id: UUID.UUID() });
    this.cookieService.set('login', cookie, 0.5, '/', 'localhost');
    this.logged = true;
    this.currentUser = username;
    this.logged = true;
    this.router.navigate(['app/home']);
  }

  logOut() {
    this.logged = false;
    this.cookieService.delete('login');
  }
  onSubmit() {
    console.log('click! ');

    if (this.form.username == null || this.form.password == null || this.form.username === '' || this.form.password === '') {
      this.formError = 'Invalid user name or password';
    } else {
      this.logAsUser(this.form.username);
    }
  }
  isEmpty(input: any) {
    return (input != null && input === '');
  }
  switchTo(activeColum: number) {
    this.activeColum = activeColum;
  }
  onAdminPage() {
    return this.router.url === '/admin';
  }
}
