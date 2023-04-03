import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { AppointmentComponent } from './appointment.component';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AppointmentRoutingModule,
    NgbDatepickerModule, NgbAlertModule, FormsModule
  ],
  declarations: [AppointmentComponent]
})
export class AppointmentModule { }
