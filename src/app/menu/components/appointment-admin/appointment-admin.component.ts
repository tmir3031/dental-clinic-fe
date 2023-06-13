import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { FormatDate } from 'src/app/shared/utils/format-date';
import { AppointmentAdminDTO } from './models/appointment-admin.model';
import { CustomValidators } from 'src/app/shared/utils/validators';
import { AppointmentAdminFilter } from './models/filter';

const TIME = 500;

@Component({
  selector: 'ado-appointment-admin',
  templateUrl: './appointment-admin.component.html',
  styleUrls: ['./appointment-admin.component.scss'],
})
export class AppointmentAdminComponent implements OnInit, OnDestroy {
  form: FormGroup;
  appointmentsListDetailed: AppointmentAdminDTO[];
  private filters: AppointmentAdminFilter = {
    startDate: null,
    endDate: null,
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
          map<[string, string, string], AppointmentAdminFilter>(
            ([search, startDate, endDate]) => {
              return {
                startDate,
                endDate,
                search,
              } as AppointmentAdminFilter;
            }
          ),
          switchMap<AppointmentAdminFilter, Observable<AppointmentAdminDTO[]>>(
            (filters) => {
              this.filters = { ...filters };
              return this.appointmentService.loadAppointmentsForAdmin(
                this.filters
              );
            }
          )
        )
        .subscribe((data) => {
          this.appointmentsListDetailed = data;
        })
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
        if (element === 'dates') {
          Object.keys(this.form.controls.dates.value).forEach((elementDate) => {
            controls.push(
              this.form
                .get(element)
                .get(elementDate)
                .valueChanges.pipe(
                  map((date) => FormatDate.convertNgbDateToStringDate(date))
                )
            );
          });
        }
      }
    });
    return controls;
  }

  private setInitialFilters(): void {
    const firstDayOfMonth = FormatDate.getFirstDayOfMonth(new Date());
    const lastDayOfMonth = FormatDate.getLastDayOfMonth(new Date());

    this.form.patchValue({
      search: null,
      dates: {
        startDate: FormatDate.convertStringDateToNgbDate(firstDayOfMonth),
        endDate: FormatDate.convertStringDateToNgbDate(lastDayOfMonth),
      },
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      search: null,
      dates: this.formBuilder.group(
        {
          startDate: null,
          endDate: null,
        },
        { validators: CustomValidators.reversedDatesValidator }
      ),
    });
  }
}
