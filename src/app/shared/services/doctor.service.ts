import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DoctorDto } from '../../about-us/models/about-us.model';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  constructor(private http: HttpClient) {}

  public getDoctors(specializationId?: string): Observable<DoctorDto[]> {
    let params = new HttpParams();
    if (specializationId) {
      params = params.append('specializationId', specializationId);
    }
    return this.http.get<{ items: DoctorDto[] }>(`${environment.apiUrl}/core/api/v1/doctors`, { params }).pipe(
      map((responseData) => {
        return responseData.items;
      })
    );
  }
}
