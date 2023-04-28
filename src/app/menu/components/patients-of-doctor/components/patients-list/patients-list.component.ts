import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PatientContactDTO } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'ado-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent{
  @Input() patients?: PatientContactDTO[] | null;
  @Output() selectedPatientChanged = new EventEmitter<PatientContactDTO>();
  @Input() patientsSubject = new BehaviorSubject<PatientContactDTO[]>([]);
  @Input() selectedPatient?: PatientContactDTO | null;

  selectPatient(patient: PatientContactDTO): void {
      if (patient) {
          this.selectedPatient = patient;
          this.selectedPatientChanged.emit(this.selectedPatient);
      }
  }


}
