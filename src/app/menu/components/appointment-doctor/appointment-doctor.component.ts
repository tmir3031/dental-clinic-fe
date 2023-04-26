import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { AppointmentPatientDTO } from '../appointment-patient/models/appointement-patient.model';
import { AppointmentFilter } from '../appointment-patient/models/appointment-filter.model';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { FormatDate } from 'src/app/shared/utils/format-date';
import { UpdateAppointmentModalComponent } from './components/modal/update-appointment-modal/update-appointment-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDto } from 'src/app/shared/models/appointment.model';

const TIME = 500;

@Component({
  selector: 'ado-appointment-doctor',
  templateUrl: './appointment-doctor.component.html',
  styleUrls: ['./appointment-doctor.component.scss'],
})
export class AppointmentDoctorComponent implements OnInit, OnDestroy {
  form: FormGroup;
  appointmentsListDetailed: AppointmentPatientDTO[];
  selectedAppointment: AppointmentDto;
  private filters: AppointmentFilter = {
    date: null,
    search: null,
  };
  private subscriptions = new Subscription();

  constructor(
    private appointmentService: AppointmentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.subscriptions.add(
      combineLatest(this.getControlsValueChanges())
        .pipe(
          map<[string, string], AppointmentFilter>(([search, date]) => {
            return {
              date,
              search,
            } as AppointmentFilter;
          })
        )
        .pipe(
          switchMap<AppointmentFilter, Observable<AppointmentPatientDTO[]>>(
            (filters) => {
              this.filters = { ...filters };
              return this.appointmentService.loadAppointments(this.filters);
            }
          )
        )
        .subscribe((data) => (this.appointmentsListDetailed = data))
    );
    this.setInitialFilters();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getControlsValueChanges(): Observable<string>[] {
    const controls = [];
    Object.keys(this.form.controls).forEach((element) => {
      if (element === 'search') {
        controls.push(
          this.form.get(element).valueChanges.pipe(debounceTime(TIME))
        );
      } else {
        controls.push(
          this.form.get(element).valueChanges.pipe(
            map((date) => {
              if (date != null) {
                return FormatDate.convertNgbDateToStringDate(date);
              }
            })
          )
        );
      }
    });
    return controls;
  }

  private setInitialFilters(): void {
    this.form.patchValue({
      search: null,
      date: FormatDate.convertDateToNgbDate(new Date()),
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      search: null,
      date: null,
    });
  }
}
