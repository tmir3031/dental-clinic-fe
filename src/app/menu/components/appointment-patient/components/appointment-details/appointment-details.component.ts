import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/shared/utils/constants';
import { AppointmentPatientDTO } from '../../models/appointement-patient.model';

@Component({
  selector: 'ado-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent {

  @Input() appointmentDetailedSelected?: AppointmentPatientDTO;
  @Output() closeAppointmentDetailedSelected = new EventEmitter<boolean>();
  dateFormat = Constants.DATE_FORMAT_DISPLAY;

  onClose(): void {
    this.closeAppointmentDetailedSelected.emit(true);
}


}
