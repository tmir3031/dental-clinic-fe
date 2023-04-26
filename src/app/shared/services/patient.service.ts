import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { FormatDate } from 'src/app/shared/utils/format-date';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/shared/services/login.service';
import { PatientDTO, UpdatePatientDTO } from 'src/app/register/models/register.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getPatient():  Observable<PatientDTO> {
    return this.loginService.userLogged
      .pipe(
        switchMap((user) => {
            return this.http.get<PatientDTO>(`${environment.apiUrl}/core/api/v1/patients/${user.userDetails.userId}`)
        })
      )
  }

  updatePatient(updatePatient: UpdatePatientDTO): Observable<void>{
    return this.loginService.getUserDetails().pipe(
      take(1),
      switchMap((user) => {
        return this.http.patch<void>(
          `http://localhost:8081/core/api/v1/patients/${user.idUser}`,
          updatePatient
        );
      })
    );
  }
}
