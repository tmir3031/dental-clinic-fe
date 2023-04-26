import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PatientService } from '../../../shared/services/patient.service';
import { PatientDTO, UpdatePatientDTO } from 'src/app/register/models/register.model';
import { FormatDate } from 'src/app/shared/utils/format-date';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/components/toasts-container/toasts.service';

@Component({
  selector: 'ado-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.scss'],
})
export class ProfilePatientComponent implements OnInit, OnDestroy {
  form?: FormGroup;
  patient: PatientDTO;
  mode?: 'EDIT' | 'VIEW';
  private userSubscription = new Subscription();
  private updateSubscription: Subscription;

  constructor(
    private patientService: PatientService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.mode = 'VIEW';
    this.initForm();
    this.userSubscription = this.patientService
      .getPatient()
      .subscribe((data) => {
        this.patient = data;
        this.setInitialValue();
      });
    this.form?.disable();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onClear(): void {
    this.mode = 'VIEW';
    this.form?.disable();
    this.setInitialValue();
  }

  onEditModeOn() {
    this.form?.enable();
    this.mode = 'EDIT';
    this.form?.controls.email.disable();
    this.form?.controls.username.disable();
    this.form?.controls.dateOfBirth.disable();
  }

  onEdit() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    this.updateSubscription = this.patientService
    .updatePatient(this.extractPatientFromForm())
    .pipe(
      catchError((error) => {
        this.toastService.showError(
          'Ne pare rau! Nu s-a putut efectua actualizarea datelor. Va rugam reveniti!'
        );
        throw error;
      }),
      tap(() =>
        this.toastService.showSuccess(
          'Datele au fost actualizate cu succes!'
        )
      )
    )
    .subscribe(() => {
      this.mode = 'VIEW';
      this.userSubscription = this.patientService
      .getPatient()
      .subscribe((data) => {
        this.patient = data;
        this.setInitialValue();
      });
    })
  }

  private extractPatientFromForm(): UpdatePatientDTO {
    const controls = this.form.controls;
    const newPatient: UpdatePatientDTO = {
      lastName: controls.lastName.value,
      firstName: controls.firstName.value,
      allergies: controls.allergies.value,
      phone: controls.phone.value,
      diseases: controls.diseases.value,
      gender: controls.gender.value,
      v: 2
    };
    return newPatient;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: [''],
      email: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      allergies: [''],
      phone: [''],
      diseases: [''],
      dateOfBirth: ['', Validators.required],
      gender: [''],
    });
  }

  private setInitialValue(): void {
    this.form?.patchValue({
      username: this.patient?.username,
      email: this.patient?.email,
      firstName: this.patient?.firstName,
      lastName: this.patient?.lastName,
      allergies: this.patient?.allergies,
      phone: this.patient?.phone,
      diseases: this.patient?.chronicDiseases,
      dateOfBirth: FormatDate.convertStringDateToNgbDate(
        this.patient?.dateOfBirth
      ),
      gender: this.patient?.gender,
    });
  }
}
