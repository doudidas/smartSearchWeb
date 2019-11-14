import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { GeneralService } from './services/general.service';
import { SnakeComponent } from './snake/snake.component';
import { CookieService } from 'ngx-cookie-service';
import { NotFoundComponent } from './notFound/notFound.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    SnakeComponent,
    NotFoundComponent,
    AdminComponent,
    MaintenanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ClarityModule,
    AdminModule,
  ],
  providers: [HttpClient, ApiService, GeneralService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
