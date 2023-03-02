import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import roLocale from '@fullcalendar/core/locales/ro';
@Component({
  selector: 'ado-individual-holidays',
  templateUrl: './individual-holidays.component.html',
  styleUrls: ['./individual-holidays.component.scss'],

})
export class IndividualHolidaysComponent {

  events = [
    {
      daysOfWeek: [0, 6], //Sundays and saturdays
      display: "background",
      color: "gray",
      overLap: false,
    },

  ];


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events,
    selectable: true,
    locale: roLocale
  };
}
