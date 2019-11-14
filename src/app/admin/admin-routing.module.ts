import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DestinationComponent } from './destination/destination.component';

export const routes: Routes = [
  { path: 'app/admin/user', component: UserComponent },
  { path: 'app/admin/destination', component: DestinationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
