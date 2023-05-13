import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { OralIntervalsService } from './services/oral-intervals.service';
import { Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/components/toasts-container/toasts.service';
import { AppointmentRequest } from 'src/app/shared/models/appointment.model';
import { DoctorDto } from 'src/app/shared/models/doctor.model';
import { SpecializationDto } from 'src/app/shared/models/specialization.model';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { SpecializationService } from 'src/app/shared/services/specialization.service';
import { FormatDate } from 'src/app/shared/utils/format-date';

@Component({
  selector: 'ado-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit, OnDestroy {
  form: FormGroup;
  specializations: SpecializationDto[];
  doctors: DoctorDto[];
  invalidAppointment = false;
  newAppointment: AppointmentRequest;
  selectedSpecialization: SpecializationDto;
  private readonly subscription: Subscription = new Subscription();

  // Optiunile pentru date-picker
  model: NgbDateStruct;
  minDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  date: { year: number; month: number };
  isUnfocused = (date: NgbDate, current: { month: number; year: number }) =>
    date.month !== current.month;
  isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  selectedDate: string;
  selectedTime: string;
  intervals: string[] = [];

  constructor(
    private calendar: NgbCalendar,
    private doctorService: DoctorService,
    private specializationService: SpecializationService,
    private oralIntervalsService: OralIntervalsService,
    private appointmentService: AppointmentService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.invalidAppointment = false;
    this.initFormGroup();
    this.subscription.add(
      this.specializationService
        .getSpecialization()
        .subscribe(
          (data) => (
            (this.specializations = data),
            this.specializations.push({ id: 100, name: 'Toate', v: 0 })
          )
        )
    );
    this.subscription.add(
      this.doctorService.getDoctors().subscribe((data) => (this.doctors = data))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSpecializationChange() {
    var specializationId = this.form.controls.specializationId.value;
    if (specializationId == 100) {
      specializationId = null;
    }
    this.subscription.add(
      this.doctorService.getDoctors(specializationId).subscribe((data) => {
        this.doctors = data;
        this.form.controls['doctorId'].reset();
      })
    );
    if (this.form.controls.date.value) {
      this.onDateChange();
    }
  }

  onDoctorChange() {
    if (this.form.controls.date.value) {
      this.onDateChange();
    }
  }

  onDateChange() {
    this.subscription.add(
      this.oralIntervalsService
        .getAvailableIntervals(
          this.form.controls.date.value,
          this.form.controls.doctorId.value,
          this.form.controls.specializationId.value
        )
        .subscribe((data) => {
          this.intervals = data;
          this.intervals.push('-');
          this.form.controls['hour'].reset();
        })
    );
  }

  createAppointment() {
    this.newAppointment = this.extractAppointmentRequestFromForm();
    this.subscription.add(
      this.appointmentService
        .createAppointment(this.extractAppointmentRequestFromForm())
        .pipe(
          catchError((error) => {
            this.toastService.showError(
              'Ne pare rau! Nu s-a putut efectua aceasta cerere, deoarece acest interval orar nu mai e disponibil!'
            );
            this.form.reset();
            this.invalidAppointment = true;
            throw error;
          }),
          tap(() =>
            this.toastService.showSuccess(
              'Cererea s-a efectuat cu succes! Va multumim!'
            )
          )
        )
        .subscribe(() => {
          this.invalidAppointment = false;
          this.intervals = [];
          this.form.reset();
          this.onSpecializationChange();
        })
    );
  }

  private extractAppointmentRequestFromForm(): AppointmentRequest {
    const controls = this.form.controls;
    const appointmentRequest: AppointmentRequest = {
      doctorId: controls.doctorId.value,
      date: FormatDate.convertNgbDateToStringDate(controls.date.value),
      hour: controls.hour.value,
    };
    return appointmentRequest;
  }

  private initFormGroup(): void {
    this.form = new FormGroup({
      specializationId: new FormControl(100),
      doctorId: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      hour: new FormControl(null, Validators.required),
    });
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
}
