import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAccountDto } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserAccountDto[]> {
    return this.http
      .get<{ items: UserAccountDto[] }>(
        `${environment.apiUrl}/core/api/v1/users`
      )
      .pipe(
        map((responseData) => {
          return responseData.items;
        })
      );
  }
}
