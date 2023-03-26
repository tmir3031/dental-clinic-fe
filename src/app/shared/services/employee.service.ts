import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmployeeDto } from '../../about-us/models/about-us.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  constructor(private http: HttpClient) {}

  public getEmployees(specializationId?: string): Observable<EmployeeDto[]> {
    let params = new HttpParams();
    if (specializationId) {
      params = params.append('specializationId', specializationId);
    }
    return this.http.get<{ items: EmployeeDto[] }>(`${environment.apiUrl}/core/api/v1/employees`, { params }).pipe(
      map((responseData) => {
        return responseData.items;
      })
    );
  }
}
