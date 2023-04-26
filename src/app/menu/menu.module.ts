import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { SharedModule } from '../shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentDoctorComponent } from './components/appointment-doctor/appointment-doctor.component';
import { AppointmentPatientComponent } from './components/appointment-patient/appointment-patient.component';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDoctorTableComponent } from './components/appointment-doctor/components/appointment-table/appointment-table.component';
import { AppointmentDetailsComponent } from './components/appointment-patient/components/appointment-details/appointment-details.component';
import { AppointmentPatientTableComponent } from './components/appointment-patient/components/appointment-table/appointment-table.component';
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';
import { ProfilePatientComponent } from './components/profile-patient/profile-patient.component';
import { UpdateAppointmentModalComponent } from './components/appointment-doctor/components/modal/update-appointment-modal/update-appointment-modal.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
  ],
  declarations: [
    MenuComponent,
    ProfileDoctorComponent,
    ProfilePatientComponent,
    AppointmentComponent,
    AppointmentDoctorComponent,
    AppointmentPatientComponent,
    AppointmentDoctorTableComponent,
    AppointmentDetailsComponent,
    AppointmentPatientTableComponent,
    UpdateAppointmentModalComponent,
    PatientsListComponent
  ],
})
export class MenuModule {}
