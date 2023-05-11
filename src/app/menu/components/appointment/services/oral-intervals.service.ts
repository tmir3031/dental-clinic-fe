import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    var ok = 0;
    let params = new HttpParams();
    if (date) {
      var newDate = FormatDate.convertNgbDateToStringDate(date);
      params = params.append('date', newDate);
      ok++;
    }
    if (doctorId) {
      params = params.append('doctorId', doctorId);
      ok++;
    }
    if (specializationId && specializationId != 100) {
      params = params.append('specializationId', specializationId);
      ok++;
    }
    if (ok !== 0) {
      return this.http
        .get<any>(
          `http://localhost:8081/core/api/v1/appointments/free-time-slot/`,
          { params }
        )
        .pipe(
          catchError((error) => {
            throw error;
          }),
          map((response) => {
            if (response) return response;
            else return null;
          })
        );
    } else return EMPTY;
  }
}
