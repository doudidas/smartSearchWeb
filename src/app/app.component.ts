import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { GeneralService } from "./services/general.service";
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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

    constructor(private router: Router, private api: ApiService, private service: GeneralService) {
    }

    public async ngOnInit() {
        let before = Date.now();
        await this.checkServer();
    }

    private async checkServer(): Promise<void> {
        let check = await this.api.helloAPI();
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
}
