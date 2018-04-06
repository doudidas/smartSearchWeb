import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-root',
  templateUrl: './views/home.html',
  styleUrls: ['./styles/main.css']
})
export class MainComponent {
  title = 'prout';
}
