import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { PatientDTO } from '../models/register.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login.service';
import { ToastService } from 'src/app/shared/components/toasts-container/toasts.service';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(
    private http: HttpClient,
    private toasts: ToastService,
    private login: LoginService
  ) {}
  public registerPatient(patient): Observable<PatientDTO> {
    return this.http
      .post<PatientDTO>('http://localhost:8081/core/api/v1/patients', patient)
      .pipe(
        catchError((errorResponse) => {
          const error = errorResponse.error.errors[0];
          if (error.errorCode === 'EMPLOYEE_USERNAME_CONFLICT') {
            this.toasts.showError(
              'Ne pare rau, dar numele de utilizator nu mai este disponibil!'
            );
          } else {
            this.toasts.showError(
              'Aplicatia a intampinat o eraore. Va rugam reveniti'
            );
          }
          return EMPTY;
        }),
        tap(() => {
          this.login.login(patient.username, patient.password).subscribe();
        })
      );
  }
  
}
