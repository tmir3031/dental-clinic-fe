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
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDoctorTableComponent } from './components/appointment-doctor/components/appointment-table/appointment-table.component';
import { AppointmentDetailsComponent } from './components/appointment-patient/components/appointment-details/appointment-details.component';
import { AppointmentPatientTableComponent } from './components/appointment-patient/components/appointment-table/appointment-table.component';
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';
import { ProfilePatientComponent } from './components/profile-patient/profile-patient.component';
import { UpdateAppointmentModalComponent } from './components/appointment-doctor/components/modal/update-appointment-modal/update-appointment-modal.component';
import { PatientsListComponent } from './components/patients-of-doctor/components/patients-list/patients-list.component';
import { PatientsOfDoctorComponent } from './components/patients-of-doctor/patients-of-doctor.component';
import { PatientRadiographyComponent } from './components/profile-patient/components/patient-radiography/patient-radiography.component';
import { RadiographyModalComponent } from './components/patients-of-doctor/components/radiography-modal/radiography-modal.component';
import { DeleteAppointmentModalComponent } from './components/appointment-patient/components/delete-appointment-modal/delete-appointment-modal.component';
import { TreatmentsOfPatientComponent } from './components/treatments-of-patient/treatments-of-patient.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/user/components/users-list/users-list.component';
import { AppointmentAdminComponent } from './components/appointment-admin/appointment-admin.component';
import { AppointmentAdminTableComponent } from './components/appointment-admin/components/appointment-table/appointment-table.component';
import { AppointmentAdminResolver } from '../shared/resolvers/appointment-doctor-resolver';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    NgbNavModule
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
    PatientsOfDoctorComponent,
    PatientsListComponent,
    PatientRadiographyComponent,
    RadiographyModalComponent,
    DeleteAppointmentModalComponent,
    TreatmentsOfPatientComponent,
    RegisterDoctorComponent,
    UserComponent,
    UsersListComponent,
    AppointmentAdminComponent,
    AppointmentAdminTableComponent,
  ],
})
export class MenuModule {}
