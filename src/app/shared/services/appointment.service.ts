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

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointmentsSubject = new Subject<AppointmentPatientDTO[]>();
  readonly appointmentsObservable = this.appointmentsSubject.asObservable();
  private filters: AppointmentFilter;

  constructor(private http: HttpClient, private loginService: LoginService, private serviceToast: ToastService) {}

  addTreatment(appointmentId: number, treatment: string): Observable<void>{
    return this.loginService.getUserDetails().pipe(
      catchError(()=>{
        this.serviceToast.showError("Aplicatia a intampinat o eroare")
        return EMPTY;
      }),
      take(1),
      switchMap((user) => {
        return this.http.patch<void>(
          `http://localhost:8081/core/api/v1/doctors/${user.idUser}/appointments/${appointmentId}`,
          {treatment}
        );
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
