import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppointmentPatientDTO } from 'src/app/menu/components/appointment-patient/models/appointement-patient.model';
import { PatientDTO } from 'src/app/register/models/register.model';
import { AppointmentDto } from 'src/app/shared/models/appointment.model';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { FormatDate } from 'src/app/shared/utils/format-date';

@Component({
  selector: 'ado-update-appointment-modal',
  templateUrl: './update-appointment-modal.component.html',
  styleUrls: ['./update-appointment-modal.component.scss']
})
export class UpdateAppointmentModalComponent implements OnDestroy, OnInit {

  @Input() appointmentSelected: AppointmentPatientDTO;
  treatment: string;
  patient : PatientDTO;
  active = 1;
  mode?: 'VIEW' | 'EDIT';
  today: string;
  private readonly subscriptionUpdateModal: Subscription = new Subscription();

  constructor(private appointmentService: AppointmentService, private activeModal: NgbActiveModal, private patientService: PatientService) {}

  ngOnInit(): void {
    this.mode = 'VIEW'
    this.treatment = this.appointmentSelected.treatment;
    this.today = FormatDate.convertDateToStringDate(new Date);
      this.subscriptionUpdateModal.add(this.patientService.getPatientInfos(this.appointmentSelected.patientDetails.userId).subscribe(
        (vl) =>{ this.patient = vl}
      ))
  }
  ngOnDestroy(): void {
    if (this.subscriptionUpdateModal) {
      this.subscriptionUpdateModal.unsubscribe();
    }
  }

  onEditMode(): void{
    this.mode = 'EDIT';
  }

  updateAppointment(): void {
    this.subscriptionUpdateModal.add(this.appointmentService.addTreatment(this.appointmentSelected.id, this.treatment).pipe(
      switchMap(() =>
          this.appointmentService.loadAppointments()
      )
  )
  .subscribe(() => this.activeModal.close()));
;
    this.activeModal.close();
  }

  onClose(): void {
    this.activeModal.close();
  }
}
