import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TreatmentDetailsDTO } from 'src/app/shared/models/treatment.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Constants } from 'src/app/shared/utils/constants';

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

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.subscriptionTreatmentsView.add(
      this.patientService.getTreatmentsForPatientView().subscribe((vl) => {
        if (this.treatmentsList !== undefined) this.listIsEmpty = false;
        console.log(this.listIsEmpty)
        console.log(this.treatmentsList?.length)
        this.treatmentsList = vl;
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptionTreatmentsView)
      this.subscriptionTreatmentsView.unsubscribe();
  }
}
