import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ApiService } from './services/api.service';
import { VroComponent } from './vro/vro.component';
import { GeneralService } from "./services/general.service";
import { SnakeComponent } from './snake/snake.component';
import { TopicComponent } from './topic/topic.component';
import { CookieService } from 'ngx-cookie-service';
import { NotFoundComponent } from './notFound/notFound.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent,
        VroComponent,
        SnakeComponent,
        TopicComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ClarityModule,
        ROUTING
    ],
    providers: [HttpClient, ApiService, GeneralService, CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
