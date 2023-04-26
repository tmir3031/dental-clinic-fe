import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDate,
} from '@ng-bootstrap/ng-bootstrap';
import { OralIntervalsService } from './services/oral-intervals.service';
import { Subject, Observable, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
  private dateSelectionSubject = new Subject<string>();

  constructor(
    private calendar: NgbCalendar,
    private doctorService: DoctorService,
    private specializationService: SpecializationService,
    private oralIntervalsService: OralIntervalsService,
    private appointmentService: AppointmentService,
    private toastService: ToastService,
    private http: HttpClient
  ) {}

  ngOnInit() {
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
        // if (this.form.controls['specializationId'].value == null)
        this.form.controls['doctorId'].reset();
      })
    );
    console.log(this.form.controls.doctorId.value);
    if (this.form.controls.date.value) {
      this.onDateChange();
    }
  }

  onDoctorChange() {
    // this.subscription.add(
    //   this.specializationService
    //     .getSpecialization()
    //     .subscribe((data) => {
    //       this.specializations = data;
    //       if (this.form.controls['doctorId'].value == null)
    //         this.form.controls['specializationId'].reset();
    //     })
    // );
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
    this.appointmentService
      .createAppointment(this.extractAppointmentRequestFromForm())
      .pipe(
        catchError((error) => {
          this.toastService.showError(
            'Ne pare rau! Nu s-a putut efectua aceasta cerere. Va rugam reveniti!'
          );
          throw error;
        }),
        tap(() =>
          this.toastService.showSuccess(
            'Cererea s-a efectuat cu succes! Va multumim!'
          )
        )
      )
      .subscribe(() => {
        this.form.reset();
        this.intervals = [];
      });
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

  // onDateChange(dateString: string) {
  //   const date = new Date(dateString);
  //   this.oralIntervalsService.getOralIntervals(date).subscribe(intervals => {
  //     this.intervals = intervals;
  //   });
  // }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  // Observabil care asculta subiectul si emite evenimente cu o intarziere de 500 de milisecunde si filtreaza evenimentele duplicate
  private dateSelectionObservable = this.dateSelectionSubject.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  // Metoda care va fi apelata atunci cand se selecteaza o data in formular
  onDateSelection(): void {
    this.dateSelectionObservable.subscribe((date) => {
      this.getIntervalsForDate(date).subscribe((intervals) => {
        console.log(intervals);
        this.intervals = intervals;
      });
    });
    console.log('AICI onDateSelection');
    // Emiterea evenimentului in subiect
    this.dateSelectionSubject.next(this.form.controls.date.value);
  }

  // Metoda care face solicitarea HTTP catre server pentru a primi intervalele disponibile pentru data selectata
  getIntervalsForDate(date: string): Observable<any> {
    console.log('AICI getIntervalsForDate');
    const url = `http://localhost:8081/core/api/v1/appointments/free-time-slot/5bf1ec1c-4cca-46cc-984e-5758704a59a0?date=03.03.2023`;
    return this.http.get(url);
  }
}
