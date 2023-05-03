import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from 'src/app/shared/components/toasts-container/toasts.service';
import { PatientContactDTO } from 'src/app/shared/models/patient.model';
import { FotoService } from 'src/app/shared/services/photo.service';
import { RadiographyModalComponent } from '../radiography-modal/radiography-modal.component';

@Component({
  selector: 'ado-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent{
  @Input() patients?: PatientContactDTO[] | null;
  @Output() selectedPatientChanged = new EventEmitter<PatientContactDTO>();
  @Input() patientsSubject = new BehaviorSubject<PatientContactDTO[]>([]);
  @Input() selectedPatient?: PatientContactDTO | null;


  constructor(private modalService: NgbModal){}

  selectPatient(patient: PatientContactDTO): void {
    if (patient) {
      this.selectedPatient = patient;
      const modal = this.modalService.open(RadiographyModalComponent, {size: 'lg'});
      (
        modal.componentInstance as RadiographyModalComponent
      ).selectedPatient = patient;
      this.selectedPatientChanged.emit(this.selectedPatient);
    }
  }

}
