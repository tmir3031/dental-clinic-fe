import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpecializationDto } from '../models/specialization.model';

@Injectable({ providedIn: 'root' })
export class SpecializationService {
  constructor(private http: HttpClient) {}

  public getSpecialization(doctorId?: string): Observable<SpecializationDto[]> {
    let params = new HttpParams();
    if (doctorId) {
      params = params.append('doctorId', doctorId);
    }
    return this.http
      .get<{ items: SpecializationDto[] }>(
        `${environment.apiUrl}/core/api/v1/specializations`,
        { params }
      )
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      );
  }
}
