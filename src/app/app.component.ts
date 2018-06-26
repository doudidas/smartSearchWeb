import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { GeneralService } from "./services/general.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent implements OnInit {
    public showError: boolean;
    public alertAppError: string;
    public loading: boolean;
    public logged: boolean;
    public displayForm: boolean;
    public currentUser: string;
    public submitted: boolean;

    public form: object;
    constructor(private router: Router,
        public api: ApiService,
        private service: GeneralService,
        private cookieService: CookieService) {
            this.submitted = false;
            this.displayForm = false;
    }

    public async ngOnInit() {
        this.init();
    }

    private async checkServer(): Promise<void> {
        console.log(new Date() + "Running healthcheck: ");
        let message = await this.api.checkHealth();
        this.togglePanel((message == null), message);
    }
    public userCheck(): void {
        this.checkServer();
    }
    public togglePanel(show: boolean, message: string) {
        if (show) {
            this.loading = false;
            this.showError = false;
        } else {
            this.loading = false;
            this.showError = true;
            this.alertAppError = message;
        }
    }
    public showForm() {
        this.displayForm = true;
    }
    public logAsGuest() {
        this.cookieService.set("login", "guest", 0.5, "/", "localhost");
        this.logged = true;
        this.currentUser = "guest";
        this.router.navigate(['home']);
    }

    public logAsUser(user) {
        this.cookieService.set("login", user.id);
        this.logged = true;
        this.currentUser = user.name;
        this.router.navigate(['home']);
    }

    public logOut() {
        this.logged = false;
        this.cookieService.delete("login");
    }
    onSubmit() {
        console.log(this.form);
        this.submitted = true;
        console.log("click! ");
    }

    private async init() {
        this.logged = this.cookieService.check("login");
        if (! this.logged) {
            this.form = {"username": "", "password": "", userType : ""};
            this.router.navigate(['']);
        } else {
            this.currentUser = this.cookieService.get("login");
            this.router.navigate(['home']);
        }
        while (true) {
            await this.checkServer();
            let timer = (this.showError) ? 1000 * 5 : 1000 * 60;
            await this.service._delay(timer);
        }
    }
}
