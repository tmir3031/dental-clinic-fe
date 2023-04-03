import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { FormatDate } from 'src/app/shared/utils/format-date';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/shared/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class OralIntervalsService {
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAvailableIntervals(
    date?: NgbDate,
    doctorId?: string,
    specializationId?: number
  ): Observable<string[]> {
    let params = new HttpParams();
    if (date) {
      var newDate = FormatDate.convertNgbDateToStringDate(date);
      params = params.append('date', newDate);
    }
    console.log(doctorId);
    if (doctorId) {
      params = params.append('doctorId', doctorId);
      console.log(doctorId);
    }
    if (specializationId && specializationId != 100) {
      params = params.append('specializationId', specializationId);
      console.log(specializationId);
    }
    console.log(specializationId);
    console.log(params);
      return this.http
        .get<any>(
          `http://localhost:8081/core/api/v1/appointments/free-time-slot/`,
          { params }
        )
        .pipe(
          catchError((error) => {
            console.log(error);
            throw error;
          }),
          map((response) => {
            if (response) return response;
            else return null;
          })
        );
  }
}
