import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitialsImageComponent } from './components/initials-image/initials-image.component';

@NgModule({
  declarations: [InitialsImageComponent],
  imports: [
    CommonModule,
    NgbModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    InitialsImageComponent
  ],
  providers: [],
})
export class SharedModule {}
