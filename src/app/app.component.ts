import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './services/api.service';

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
         this.showError = false;
         this.loading   = false;
        if (! accessible) {
            this.api.changeAPIUrl("localhost:9000/api/");

            if (! this.api.helloAPI()) {
                this.loading       = false;
                this.showError     = true;
                this.alertAppError = "Limited access to ressources : Impossible to connect on  the API server ! ";
            }
        }
    }
}
