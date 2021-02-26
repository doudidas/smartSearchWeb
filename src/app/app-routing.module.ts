import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SnakeComponent } from './snake/snake.component';
import { AdminComponent } from './admin/admin.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NotFoundComponent } from './notFound/notFound.component';
import { UserComponent } from './admin/user/user.component';
import { DestinationComponent } from './admin/destination/destination.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: MaintenanceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'snake', component: SnakeComponent },
  { path: 'admin/home', component: AdminComponent },
  { path: 'admin/user', component: UserComponent },
  { path: 'admin/destination', component: DestinationComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
