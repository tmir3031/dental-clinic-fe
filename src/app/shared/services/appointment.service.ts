import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login.service';
import { environment } from 'src/environments/environment';
import { AppointmentRequest } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  createAppointment(appointmentRequest: AppointmentRequest): Observable<void> {
    // console.log("Aci");
    // return this.loginService.getUserDetails().pipe(
    //   take(1),
    //   switchMap((user) => {
    //     console.log(user);
    //     return this.http.post<void>(`http://localhost:8081/core/api/v1/patients/core/api/v1/patients/${user.idUser}/appointments`,appointmentRequest);
    //   })
    // );
    console.log("Aci");
    return this.loginService.getUserDetails().pipe(
      take(1),
      switchMap((user) => {
        console.log(user);
        return this.http.post<void>(
          `http://localhost:8081/core/api/v1/patients/${user.idUser}/appointments`, //modificare aici
          appointmentRequest
        );
      })
    );
  }
}
