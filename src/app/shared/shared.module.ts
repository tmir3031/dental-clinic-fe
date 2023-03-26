import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgbModule,
        FullCalendarModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        NgbModule,
        FullCalendarModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: []
})
export class SharedModule { }
