import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { tap, switchMap, map, startWith } from 'rxjs/operators';
import { PatientContactDTO } from 'src/app/shared/models/patient.model';
import { PatientService } from 'src/app/shared/services/patient.service';
import { PatientFilter } from './models/filter';

@Component({
  selector: 'ado-patients-of-doctor',
  templateUrl: './patients-of-doctor.component.html',
  styleUrls: ['./patients-of-doctor.component.scss'],
})
export class PatientsOfDoctorComponent implements OnInit, OnDestroy {
  patients?: PatientContactDTO[];
  selectedPatient?: PatientContactDTO | null;
  showPatientDetails = false;
  filterPatientsForm?: FormGroup;
  patientObservable?: Observable<PatientContactDTO[]>;

  private patientsSubject = new BehaviorSubject<PatientContactDTO[]>([]);
  private patientSubscription: Subscription = new Subscription();
  private subscriptions = new Subscription();

  constructor(private readonly service: PatientService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPatientsObservable();
  }

  private loadPatientsObservable(): void {
    this.patientObservable = this.service.getPatientsForADactor().pipe(
      tap((data) => {
        this.patients = data;
      }),
      switchMap(() =>
        combineLatest(this.getControlsValueChanges()).pipe(
          map<(string | PatientFilter)[], PatientFilter>(([search]) => {
            return {
              search,
            } as PatientFilter;
          })
        )
      ),
      tap((filters) => {
        if (filters) {
          this.patientsSubject.next(this.filterData(filters));
        }
      }),
      switchMap<PatientFilter, Observable<PatientContactDTO[]>>(() => {
        return this.patientsSubject.asObservable();
      })
    );
  }

  private getControlsValueChanges(): Observable<string | PatientFilter>[] {
    const controls: Observable<string>[] = [];
    if (this.filterPatientsForm) {
      Object.keys(this.filterPatientsForm.controls).forEach((element) => {
        if (this.filterPatientsForm) {
          controls.push(
            this.filterPatientsForm
              .get(element)!
              .valueChanges.pipe(
                startWith(this.filterPatientsForm?.get(element)!.value)
              )
          );
        }
      });
      return controls;
    }

    return [];
  }

  ngOnDestroy(): void {
    this.patientSubscription?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  onSelectedPatient(patient: PatientContactDTO | null): void {
    if (patient) {
      this.selectedPatient = patient;
      this.showPatientDetails = true;
    } else {
      this.selectedPatient = null;
      this.showPatientDetails = false;
    }
  }

  onPatientDetailAction(refreshData: boolean): void {
    this.showPatientDetails = false;
    if (refreshData) {
      this.loadPatientsObservable();
    } else {
      this.onSelectedPatient(null);
    }
  }

  private initForm(): void {
    this.filterPatientsForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  filterData(filterFormValue: PatientFilter) {
    const filteredData = this.patients!.filter((item) => {
      if (filterFormValue.search) {
        if (
          !item.firstName
            .toLowerCase()
            .includes(filterFormValue.search.toLowerCase()) &&
          !item.lastName
            .toLowerCase()
            .includes(filterFormValue.search.toLowerCase())
        ) {
          return false;
        }
      }
      return this.patients;
    });

    return filteredData;
  }
}
