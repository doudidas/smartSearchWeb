import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ClarityModule} from '@clr/angular';
import {AppComponent} from './app.component';
import {ROUTING} from "./app.routing";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {LoginComponent} from './login/login.component';
import {UsersComponent} from './users/users.component';
import {ApiService} from './services/api.service';
import {VroComponent} from './vro/vro.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent,
        VroComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ClarityModule,
        ROUTING
    ],
    providers: [HttpClient, ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
