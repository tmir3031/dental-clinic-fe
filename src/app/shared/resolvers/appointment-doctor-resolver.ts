import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AppointmentAdminDTO } from 'src/app/menu/components/appointment-admin/models/appointment-admin.model';
import { AppointmentService } from '../services/appointment.service';
import { Observable } from 'rxjs';
import { AppointmentAdminFilter } from 'src/app/menu/components/appointment-admin/models/filter';
import { FormatDate } from '../utils/format-date';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppointmentAdminResolver
  implements Resolve<AppointmentAdminDTO[]>
{
  private filtersAdmin: AppointmentAdminFilter;

  constructor(private appointmentService: AppointmentService) {}

  resolve(): Observable<AppointmentAdminDTO[]> {
    const firstDayOfMonth = FormatDate.getFirstDayOfMonth(new Date());
    const lastDayOfMonth = FormatDate.getLastDayOfMonth(new Date());

    this.filtersAdmin = {
      endDate: lastDayOfMonth,
      startDate: firstDayOfMonth,
      search: null,
    };
    return this.appointmentService
      .loadAppointmentsForAdmin(this.filtersAdmin)
      .pipe(take(1));
  }
}
