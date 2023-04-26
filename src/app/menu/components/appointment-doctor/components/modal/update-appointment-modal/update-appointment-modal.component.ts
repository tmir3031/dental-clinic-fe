import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppointmentPatientDTO } from 'src/app/menu/components/appointment-patient/models/appointement-patient.model';
import { AppointmentDto } from 'src/app/shared/models/appointment.model';
import { AppointmentService } from 'src/app/shared/services/appointment.service';

@Component({
  selector: 'ado-update-appointment-modal',
  templateUrl: './update-appointment-modal.component.html',
  styleUrls: ['./update-appointment-modal.component.scss']
})
export class UpdateAppointmentModalComponent implements OnDestroy {

  @Input() appointmentSelected: AppointmentPatientDTO;
  treatment: string;
  private subscriptionUpdateModal: Subscription;

  constructor(private appointmentService: AppointmentService, private activeModal: NgbActiveModal) {}

  ngOnDestroy(): void {
    if (this.subscriptionUpdateModal) {
      this.subscriptionUpdateModal.unsubscribe();
    }
  }

  updateAppointment(): void {
   
  }

  onClose(): void {
    this.activeModal.close();
  }
}
