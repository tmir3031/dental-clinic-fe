import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DentalServicesComponent } from './dental-services.component';

const routes: Routes = [{ path: '', component: DentalServicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DentalServicesRoutingModule { }
