import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './services/api.service';
import {System} from "typescript";
import {delay} from "rxjs/operator/delay";
import {createAwait} from "typescript/lib/tsserverlibrary";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

@Injectable()
export class AppComponent implements OnInit {
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
        this.togglePanel(accessible);
        if (! accessible) {
            if (! this.api.helloAPI()) {
               this.togglePanel(accessible);
            }
        }
    }
    private togglePanel(show: boolean) {
        if (show) {
            this.showError     = false;
            this.loading       = false;
        } else {
            this.loading       = false;
            this.showError     = true;
            this.alertAppError = "Limited access to resources : Impossible to connect on  the API server ! ";
        }
    }
}
