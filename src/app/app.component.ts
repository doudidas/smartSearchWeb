import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {User} from "./class/user";
import { ApiService } from './services/api.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent implements OnInit{
     public showError: boolean;
     public alertAppError: string;
     private loading: boolean;

    constructor(private router: Router, private api: ApiService) {
    }
    ngOnInit() {
        this.checkServer();
    }

     private checkServer(): void {
        let accessible = this.api.helloAPI();
        if (accessible) {
            this.showError = false;
            this.loading   = false;
        } else {
            this.loading       = false;
            this.showError     = true;
            this.alertAppError = "Impossible de se Connecter au serveur !";
        }
    }
}
