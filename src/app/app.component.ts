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
    public submitted = false;
    public form: object;
    constructor(private router: Router, private api: ApiService, private service: GeneralService, private cookieService: CookieService) {
    }

    public async ngOnInit() {
        this.displayForm = false;
        this.logged = this.cookieService.check("login");
        if (!this.logged) {
            this.form = {"username": "", "password": "", userType : ""};
            this.router.navigate(['']);
        } else {
            this.currentUser = this.cookieService.get("login");
            this.router.navigate(['home']);
        }
        while (true) {
            await this.checkServer();
            await this.service._delay(1000 * 60);
        }
    }

    private async checkServer(): Promise<void> {
        let check = await this.api.helloAPI();
        console.log(new Date() + " API healthcheck: " + check);
        await this.togglePanel(check);
    }
    private async togglePanel(show: boolean) {
        console.log("show: " + show);
        if (show) {
            this.loading = false;
            this.showError = false;
        } else {
            this.loading = false;
            this.showError = true;
            this.alertAppError = "Limited access to resources : Impossible to connect on  the API server ! ";
        }
    }
    public showForm() {
        this.displayForm = true;
    }
    public logAsGuest() {
        this.cookieService.set("login", "guest");
        this.logged = true;
        this.currentUser = "guest";
        this.router.navigate(['home']);
    }

    public logAsUser(user) {

        this.cookieService.set("login", user.name);
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
}
