import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import {
  PatientDTO,
  UpdatePatientDTO,
} from 'src/app/register/models/register.model';
import { environment } from 'src/environments/environment';
import { PatientContactDTO } from '../models/patient.model';
import { switchMap, map, take } from 'rxjs/operators';
import { TreatmentDetailsDTO } from '../models/treatment.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getPatient(): Observable<PatientDTO> {
    return this.loginService.userLogged.pipe(
      switchMap((user) => {
        return this.http.get<PatientDTO>(
          `${environment.apiUrl}/core/api/v1/patients/${user.userDetails.userId}`
        );
      })
    );
  }

  getPatientInfos(patientId: string): Observable<PatientDTO> {
    return this.http.get<PatientDTO>(
      `${environment.apiUrl}/core/api/v1/patients/${patientId}`
    );
  }

  getPatientsForADactor(): Observable<PatientContactDTO[]> {
    return this.loginService.userLogged.pipe(
      switchMap((user) => {
        return this.http
          .get<{ items: PatientContactDTO[] }>(
            `${environment.apiUrl}/core/api/v1/doctors/my-patients/${user.userDetails.userId}`
          )
          .pipe(
            map((responseData) => {
              return responseData.items;
            })
          );
      })
    );
  }

  getTreatmentsForPatientView(): Observable<TreatmentDetailsDTO[]>  {
    return this.loginService.userLogged.pipe(
      switchMap((user) => {
        return this.http
          .get<{ items: TreatmentDetailsDTO[] }>(
            `${environment.apiUrl}/core/api/v1/patients/treatments/${user.userDetails.userId}`
          )
          .pipe(
            map((responseData) => {
              return responseData.items;
            })
          );
      })
    );
  }

  getTreatmentsForDoctorView(
    patientId: string
  ): Observable<TreatmentDetailsDTO[]> {
    return this.http
      .get<{ items: TreatmentDetailsDTO[] }>(
        `${environment.apiUrl}/core/api/v1/patients/treatments/${patientId}`
      )
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      );
  }

  updatePatient(updatePatient: UpdatePatientDTO): Observable<void> {
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
