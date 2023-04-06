import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentDoctorComponent } from './appointment-doctor.component';

const routes: Routes = [{ path: '', component: AppointmentDoctorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentDoctorRoutingModule { }
