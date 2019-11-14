import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { HttpClient } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DestinationComponent } from './destination/destination.component';



@NgModule({
  declarations: [UserComponent, DestinationComponent],
  imports: [CommonModule, AdminRoutingModule, ClarityModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClient]
})
export class AdminModule { }
