import { Injectable } from '@angular/core';
import { PriceDto } from '../models/prices.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PricesService {

  constructor(private http: HttpClient) {}

  public getPricesForAType(type?: string): Observable<PriceDto[]> {
    let params = new HttpParams();
    if (type) {
      params = params.append('type', type); 
    }
    return this.http.get<{ items: PriceDto[] }>(`${environment.apiUrl}/core/api/v1/prices`).pipe(
      map((responseData) => {
        return responseData.items;
      })
    );
  }

}
