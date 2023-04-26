import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentDoctorComponent } from './components/appointment-doctor/appointment-doctor.component';
import { AppointmentPatientComponent } from './components/appointment-patient/appointment-patient.component';
import { ProfilePatientComponent } from './components/profile-patient/profile-patient.component';
import { ProfileDoctorComponent } from './components/profile-doctor/profile-doctor.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'appointment', component: AppointmentComponent },
      { path: 'history', component: AppointmentPatientComponent },
      { path: 'profile', component: ProfilePatientComponent },
      { path: 'my-profile', component: ProfileDoctorComponent },
      { path: 'view', component: AppointmentDoctorComponent },
      { path: 'patients-list', component: PatientsListComponent},
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
