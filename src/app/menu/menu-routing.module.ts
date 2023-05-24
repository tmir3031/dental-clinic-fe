import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentDoctorComponent } from './components/appointment-doctor/appointment-doctor.component';
import { AppointmentPatientComponent } from './components/appointment-patient/appointment-patient.component';
import { ProfilePatientComponent } from './components/profile-patient/profile-patient.component';
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';
import { PatientsOfDoctorComponent } from './components/patients-of-doctor/patients-of-doctor.component';
import { Role } from '../login/models/login.model';
import { TreatmentsOfPatientComponent } from './components/treatments-of-patient/treatments-of-patient.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'appointment', component: AppointmentComponent, data: { roles: [Role.USER] } },
      { path: 'history', component: AppointmentPatientComponent, data: { roles: [Role.USER] } },
      { path: 'profile', component: ProfilePatientComponent, data: { roles: [Role.USER] } },
      { path: 'my-profile', component: ProfileDoctorComponent, data: { roles: [Role.DOCTOR] } },
      { path: 'view', component: AppointmentDoctorComponent, data: { roles: [Role.DOCTOR] } },
      { path: 'patients-list', component: PatientsOfDoctorComponent, data: { roles: [Role.DOCTOR] } },
      { path: 'my-treatments', component: TreatmentsOfPatientComponent, data: { roles: [Role.USER] }, },
      { path: 'register-doctor', component: RegisterDoctorComponent, data: { roles: [Role.ADMIN] }, },
      { path: 'users', component: UserComponent, data: { roles: [Role.ADMIN] }, },
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
