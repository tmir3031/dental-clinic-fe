import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AppointmentAdminDTO } from '../../models/appointment-admin.model';
import { Constants } from 'src/app/shared/utils/constants';
import { FormatDate } from 'src/app/shared/utils/format-date';

@Component({
  selector: 'ado-appointment-admin-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentAdminTableComponent implements OnInit, OnChanges {
  @Input() appointmentsListDetailed: AppointmentAdminDTO[];
  appointmentsList: AppointmentAdminDTO[];
  dateFormat = Constants.DATE_FORMAT_DISPLAY;
  collectionSize: number;
  page = 1;
  pageSize = 6;
  listIsEmpty = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.appointmentsListDetailed)
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appointmentsListDetailed && this.appointmentsListDetailed) {
      this.refreshAppointments();
      this.collectionSize = this.appointmentsListDetailed.length;
    }
    this.listIsEmpty =
      this.appointmentsList && this.appointmentsList.length === 0;
  }


  trackByAppointment(index : number, appointment: AppointmentAdminDTO) {
    return appointment ? appointment.id : undefined;
};

  refreshAppointments(): void {
    this.appointmentsList = this.appointmentsListDetailed.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
}
