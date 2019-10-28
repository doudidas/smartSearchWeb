import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { SnakeComponent } from './snake/snake.component';
import { TopicComponent } from './topic/topic.component';
import { AdminComponent } from './admin/admin.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';


const routes: Routes = [
  { path: '', redirectTo: 'app/home', pathMatch: 'full'},
  { path: 'app/home', component: HomeComponent },
  { path: 'app/about', component: AboutComponent },
  { path: 'app/login', component: LoginComponent },
  { path: 'app/snake', component: SnakeComponent },
  { path: 'app/topic/:id', component: TopicComponent },
  { path: 'app/topic', component: TopicComponent },
  { path: 'app/admin', component: AdminComponent },
  { path: 'app/maintenance', component: MaintenanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
