import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDoctorComponent } from './appointment-doctor.component';
import { SharedModule } from '../shared/shared.module';
import { AppointmentDoctorRoutingModule } from './appointment-doctor-routing';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, AppointmentDoctorRoutingModule
  ],
  declarations: [AppointmentDoctorComponent, AppointmentTableComponent]
})
export class AppointmentDoctorModule { }
