import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './app.main';

const appRoutes: Routes = [
  { path: 'home', component: MainComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
    declarations: [
      AppComponent
    ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
  ), BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
