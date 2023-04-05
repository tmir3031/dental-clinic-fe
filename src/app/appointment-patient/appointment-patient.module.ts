import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentPatientComponent } from './appointment-patient.component';
import { SharedModule } from '../shared/shared.module';
import { AppointmentPatientRoutingModule } from './appointment-patient-routing.module';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';
import { AppointmentDetailsComponent } from './components/appointment-details/appointment-details.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, AppointmentPatientRoutingModule
  ],
  declarations: [AppointmentPatientComponent, AppointmentTableComponent, AppointmentDetailsComponent]
})
export class AppointmentPatientModule { }
