import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentDoctorComponent } from './components/appointment-doctor/appointment-doctor.component';
import { AppointmentPatientComponent } from './components/appointment-patient/appointment-patient.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDoctorTableComponent } from './components/appointment-doctor/components/appointment-table/appointment-table.component';
import { AppointmentDetailsComponent } from './components/appointment-patient/components/appointment-details/appointment-details.component';
import { AppointmentPatientTableComponent } from './components/appointment-patient/components/appointment-table/appointment-table.component';

@NgModule({
  imports: [CommonModule, SharedModule, MenuRoutingModule, NgbDatepickerModule, NgbAlertModule, FormsModule],
  declarations: [
    MenuComponent,
    ProfileComponent,
    AppointmentComponent,
    AppointmentDoctorComponent,
    AppointmentPatientComponent,
    AppointmentDoctorTableComponent,
    AppointmentDetailsComponent,
    AppointmentPatientTableComponent

  ]
})
export class MenuModule {}
