import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentPatientComponent } from './appointment-patient.component';
import { SharedModule } from '../shared/shared.module';
import { AppointmentPatientRoutingModule } from './appointment-patient-routing.module';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, AppointmentPatientRoutingModule
  ],
  declarations: [AppointmentPatientComponent, AppointmentTableComponent]
})
export class AppointmentPatientModule { }
