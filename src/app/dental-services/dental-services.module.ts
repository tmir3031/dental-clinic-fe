import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentalServicesComponent } from './dental-services.component';
import { SharedModule } from '../shared/shared.module';
import { DentalServicesRoutingModule } from './dental-services-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DentalServicesRoutingModule
  ],
  declarations: [DentalServicesComponent]
})
export class DentalServicesModule { }
