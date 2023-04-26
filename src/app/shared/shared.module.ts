import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InitialsImageComponent } from './components/initials-image/initials-image.component';
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';

@NgModule({
  declarations: [InitialsImageComponent, ToastsContainerComponent],
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
    InitialsImageComponent,
    ToastsContainerComponent
  ],
  providers: [],
})
export class SharedModule {}
