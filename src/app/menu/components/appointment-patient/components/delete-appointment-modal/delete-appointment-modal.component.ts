import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { AppointmentPatientDTO } from '../../models/appointement-patient.model';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ado-delete-appointment-modal',
  templateUrl: './delete-appointment-modal.component.html',
  styleUrls: ['./delete-appointment-modal.component.scss'],
})
export class DeleteAppointmentModalComponent implements OnDestroy {
  @Input() appointmentSelected: AppointmentPatientDTO;
  private readonly subscriptionDeleteModal: Subscription = new Subscription();

  constructor(
    private appointmentService: AppointmentService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptionDeleteModal) {
      this.subscriptionDeleteModal.unsubscribe();
    }
  }

  deleteAppointment(): void {
    this.subscriptionDeleteModal.add(
      this.appointmentService
        .deleteAppointmentByPatient(this.appointmentSelected.id)
        .pipe(switchMap(() => this.appointmentService.loadAppointments()))
        .subscribe(() => this.activeModal.close())
    );
    this.activeModal.close();
  }

  onClose(): void {
    this.activeModal.close();
  }
}
