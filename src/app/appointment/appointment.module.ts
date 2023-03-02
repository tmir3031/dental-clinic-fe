import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentComponent } from './appointment.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppointmentRoutingModule
  ],
  declarations: [AppointmentComponent]
})
export class AppointmentModule { }
