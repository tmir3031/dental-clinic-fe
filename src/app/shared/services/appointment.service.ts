import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login.service';
import { environment } from 'src/environments/environment';
import { AppointmentRequest } from '../models/appointment.model';
import { AppointmentPatientDTO } from 'src/app/menu/components/appointment-patient/models/appointement-patient.model';
import { AppointmentFilter } from 'src/app/menu/components/appointment-patient/models/appointment-filter.model';
import { ToastService } from '../components/toasts-container/toasts.service';
import { LoadingScope } from '../loader/loader.decorator';
import { AppointmentAdminDTO } from 'src/app/menu/components/appointment-admin/models/appointment-admin.model';
import { AppointmentAdminFilter } from 'src/app/menu/components/appointment-admin/models/filter';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsSubject = new Subject<AppointmentPatientDTO[]>();
  readonly appointmentsObservable = this.appointmentsSubject.asObservable();
  private appointmentsAdminSubject = new Subject<AppointmentAdminDTO[]>();
  readonly appointmentsAdminObservable =
    this.appointmentsAdminSubject.asObservable();
  private filters: AppointmentFilter;
  private filtersAdmin: AppointmentAdminFilter;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private serviceToast: ToastService
  ) {}

  addTreatment(appointmentId: number, treatment: string): Observable<void> {
    return this.loginService.getUserDetails().pipe(
      catchError(() => {
        this.serviceToast.showError('Aplicatia a intampinat o eroare');
        return EMPTY;
      }),
      take(1),
      switchMap((user) => {
        return this.http.patch<void>(
          `http://localhost:8081/core/api/v1/doctors/${user.idUser}/appointments/${appointmentId}`,
          { treatment }
        );
      })
    );
  }

  deleteAppointmentByPatient(appointmentId: number): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:8081/core/api/v1/patients/appointments/${appointmentId}`
      )
      .pipe(
        catchError(() => {
          this.serviceToast.showError('Aplicatia a intampinat o eroare');
          return EMPTY;
        })
      );
  }

  deleteAppointmentByDoctor(appointmentId: number): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:8081/core/api/v1/doctors/appointments/${appointmentId}`
      )
      .pipe(
        catchError(() => {
          this.serviceToast.showError('Aplicatia a intampinat o eroare');
          return EMPTY;
        })
      );
  }

  createAppointment(appointmentRequest: AppointmentRequest): Observable<void> {
    return this.loginService.getUserDetails().pipe(
      take(1),
      switchMap((user) => {
        return this.http.post<void>(
          `http://localhost:8081/core/api/v1/patients/${user.idUser}/appointments`,
          appointmentRequest
        );
      })
    );
  }

  loadAppointmentsForAdmin(
    filters?: AppointmentAdminFilter
  ): Observable<AppointmentAdminDTO[]> {
    if (filters) {
      this.filtersAdmin = filters;
    }
    this.getAppointmentsDetailedForAdmin();
    return this.appointmentsAdminObservable;
  }

  private getAppointmentsDetailedForAdmin(): void {
    let params = new HttpParams();
    if (this.filtersAdmin) {
      if (this.filtersAdmin.endDate) {
        params = params.append('endDate', this.filtersAdmin.endDate);
      }
      if (this.filtersAdmin.startDate) {
        params = params.append('endDate', this.filtersAdmin.startDate);
      }
      if (this.filtersAdmin.search) {
        params = params.append('search', this.filtersAdmin.search);
      }
    }
    this.http
      .get<{ items: AppointmentAdminDTO[] }>(
        `${environment.apiUrl}/core/api/v1/users/all-app`,
        { params }
      )
      .pipe(
        map((response) => response.items),
        tap((value) => {
          console.log(value);
          this.appointmentsAdminSubject.next(value);
        })
      )
      .subscribe();
  }

  @LoadingScope()
  loadAppointments(
    filters?: AppointmentFilter
  ): Observable<AppointmentPatientDTO[]> {
    if (filters) {
      this.filters = filters;
    }
    this.getAppointmentsDetailed();
    return this.appointmentsObservable;
  }

  private getAppointmentsDetailed(): void {
    let params = new HttpParams();
    if (this.filters) {
      if (this.filters.date) {
        params = params.append('date', this.filters.date);
      }
      if (this.filters.search) {
        params = params.append('search', this.filters.search);
      }
    }
    this.http
      .get<{ items: AppointmentPatientDTO[] }>(
        `${environment.apiUrl}/core/api/v1/appointments`,
        { params }
      )
      .pipe(
        map((response) => response.items),
        tap((value) => {
          this.appointmentsSubject.next(value);
        })
      )
      .subscribe();
  }
}
