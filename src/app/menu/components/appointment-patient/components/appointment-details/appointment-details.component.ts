import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from 'src/app/shared/utils/constants';
import { AppointmentPatientDTO } from '../../models/appointement-patient.model';
import { FormatDate } from 'src/app/shared/utils/format-date';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteAppointmentModalComponent } from '../delete-appointment-modal/delete-appointment-modal.component';

@Component({
  selector: 'ado-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss'],
})
export class AppointmentDetailsComponent implements OnInit {
  @Input() appointmentDetailedSelected?: AppointmentPatientDTO;
  @Output() closeAppointmentDetailedSelected = new EventEmitter<boolean>();
  dateFormat = Constants.DATE_FORMAT_DISPLAY;
  today: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    console.log(this.appointmentDetailedSelected)
    this.today = FormatDate.convertDateToStringDate(new Date());
  }

  onDelete(): void {
    const modal = this.modalService.open(DeleteAppointmentModalComponent);
    (
      modal.componentInstance as DeleteAppointmentModalComponent
    ).appointmentSelected = this.appointmentDetailedSelected;
    this.closeAppointmentDetailedSelected.emit(true);
  }

  onClose(): void {
    this.closeAppointmentDetailedSelected.emit(true);
  }
}
