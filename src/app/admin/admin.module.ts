import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { HttpClient } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DestinationComponent } from './destination/destination.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [UserComponent, DestinationComponent],
  imports: [CommonModule, ClarityModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClient]
})
export class AdminModule { }
