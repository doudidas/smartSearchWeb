import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {User} from "./class/user";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    public showError: boolean;
    public alertAppError: string;
    private http;
    private loading: boolean;

    constructor(private router: Router, http: HttpClient) {
        this.http = http;
    }
    ngOnInit() {
        this.helloAPI();
    }

    private helloAPI() {
        this.loading = true;
        this.http.get('http://0.0.0.0:9000/api/user').toPromise().then(response => {
            this.showError = false;
            this.loading   = false;
            return true;
        }, error => {
            this.loading = false;
            this.showError = true;
            console.log(error);
            this.alertAppError = "Impossible de se Connecter au serveur !";
            return false;
        });
    }
}
