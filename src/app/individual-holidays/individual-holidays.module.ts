import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IndividualHolidaysRoutingModule } from './individual-holidays-routing.module';
import { IndividualHolidaysComponent } from './individual-holidays.component';

@NgModule({
  declarations: [
    IndividualHolidaysComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IndividualHolidaysRoutingModule
  ]
})
export class IndividualHolidaysModule { }
