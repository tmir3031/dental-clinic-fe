import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentPatientComponent } from './appointment-patient.component';

const routes: Routes = [{ path: '', component: AppointmentPatientComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentPatientRoutingModule { }
