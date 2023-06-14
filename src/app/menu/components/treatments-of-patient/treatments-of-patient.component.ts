import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TreatmentDetailsDTO } from 'src/app/shared/models/treatment.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Constants } from 'src/app/shared/utils/constants';
import { PatientRadiographyComponent } from '../profile-patient/components/patient-radiography/patient-radiography.component';

@Component({
  selector: 'ado-treatments-of-patient',
  templateUrl: './treatments-of-patient.component.html',
  styleUrls: ['./treatments-of-patient.component.scss'],
})
export class TreatmentsOfPatientComponent implements OnInit, OnDestroy {
  dateFormat = Constants.DATE_FORMAT_DISPLAY;
  listIsEmpty = true;
  treatmentsList: TreatmentDetailsDTO[];
  private readonly subscriptionTreatmentsView: Subscription =
    new Subscription();

  constructor(
    private patientService: PatientService,
    private modalService: NgbModal
  ) {}
  ngOnInit() {
    this.subscriptionTreatmentsView.add(
      this.patientService.getTreatmentsForPatientView().subscribe((vl) => {
        if (vl.length !== 0) this.listIsEmpty = false;
        this.treatmentsList = vl;
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptionTreatmentsView)
      this.subscriptionTreatmentsView.unsubscribe();
  }

  viewRadiography() {
    const modal = this.modalService.open(PatientRadiographyComponent, {
      size: 'lg',
    });
    modal.componentInstance as PatientRadiographyComponent;
  }
}
