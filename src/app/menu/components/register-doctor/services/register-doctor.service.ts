import { EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/components/toasts-container/toasts.service';
import { RegisterDoctor } from '../models/register-doctor.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RegisterDoctorService {
  constructor(
    private http: HttpClient,
    private toasts: ToastService,
  ) {}
 public registerDoctor(doctor: RegisterDoctor): Observable<RegisterDoctor> {
    return this.http
      .post<RegisterDoctor>(`${environment.apiUrl}/core/api/v1/doctors/create`, doctor)
      .pipe(
        catchError((errorResponse) => {
          const error = errorResponse.error.errors[0];
          if (error.errorCode === 'EMPLOYEE_USERNAME_CONFLICT') {
            this.toasts.showError(
              'Ne pare rau, dar numele de utilizator nu mai este disponibil!'
            );
          } else {
            this.toasts.showError(
              'Aplicatia a intampinat o eroare. Va rugam reveniti'
            );
          }
          return EMPTY;
        }),
        tap(() => {
            this.toasts.showSuccess(
                'Doctorul a fost adaugat cu succes'
              );
        })
      );
  }
}
