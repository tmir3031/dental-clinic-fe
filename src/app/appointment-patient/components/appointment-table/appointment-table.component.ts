import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AppointmentPatientDTO } from '../../models/appointement-patient.model';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'ado-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss'],
})
export class AppointmentTableComponent implements OnChanges {
  @Input() appointmentsListDetailed: AppointmentPatientDTO[];
  appointmentDetailedSelected: AppointmentPatientDTO;
  appointmentsList: AppointmentPatientDTO[];
  dateFormat = Constants.DATE_FORMAT_DISPLAY;
  collectionSize: number;
  page = 1;
  pageSize = 7;
  listIsEmpty = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appointmentsListDetailed && this.appointmentsListDetailed) {
      this.refreshAppointments();
      this.collectionSize = this.appointmentsListDetailed.length;
      if (this.appointmentDetailedSelected) {
        const appointmentDetailedSelectedNew =
          this.appointmentsListDetailed.find(
            (appointment) =>
              this.appointmentDetailedSelected.id === appointment.id
          );
        this.appointmentDetailedSelected = appointmentDetailedSelectedNew;
      }
    }
    this.listIsEmpty =
      this.appointmentsList && this.appointmentsList.length === 0;
  }

  viewRequest(appointmentDetailedSelected: AppointmentPatientDTO): void {
    this.appointmentDetailedSelected = appointmentDetailedSelected;
  }

  refreshAppointments(): void {
    this.appointmentsList = this.appointmentsListDetailed.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  onCloseAppointmentDetailedSelected(refreshData: boolean): void {
    if (refreshData) {
        this.appointmentDetailedSelected = null;
    }
}

}
