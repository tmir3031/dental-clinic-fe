import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DoctorDto } from '../models/doctor.model';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getDoctorDetails(): Observable<DoctorDto> {
    return this.loginService.userLogged.pipe(
      switchMap((user) => {
        return this.http.get<DoctorDto>(
          `${environment.apiUrl}/core/api/v1/doctors/${user.userDetails.userId}`
        );
      })
    );
  }

  public getDoctors(specializationId?: number): Observable<DoctorDto[]> {
    let params = new HttpParams();
    if (specializationId) {
      params = params.append('specializationId', specializationId);
    }
    return this.http
      .get<{ items: DoctorDto[] }>(
        `${environment.apiUrl}/core/api/v1/doctors`,
        { params }
      )
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      );
  }
}
