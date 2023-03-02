import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualHolidaysComponent } from './individual-holidays.component';

const routes: Routes = [{ path: '', component: IndividualHolidaysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualHolidaysRoutingModule { }
