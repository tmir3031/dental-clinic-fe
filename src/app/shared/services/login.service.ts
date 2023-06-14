import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Role, User } from 'src/app/login/models/login.model';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../models/user.mode';

@Injectable({ providedIn: 'root' })
export class LoginService {
  userLogged = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    this.http
      .post(`${environment.apiUrl}/core/api/v1/logout`, {
        refreshToken: this.userLogged.value.refreshToken,
      })
      .subscribe(() => {
        this.userLogged.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      });
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/core/api/v1/login`, {
        username,
        password,
      })
      .pipe(
        map((responseData) => {
          return { ...responseData };
        }),
        tap((user) => {
          this.userLogged.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
          this.redirectUserByRole(user.userDetails.role);
        })
      );
  }

  refresh(): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/core/api/v1/refresh`, {
        refreshToken: this.userLogged.value.refreshToken,
      })
      .pipe(
        map((responseData) => {
          const expirationDate = new Date(
            new Date().getTime() + +responseData.expiresIn * 1000
          );
          return { ...responseData, expirationDate };
        }),
        tap((user) => {
          this.userLogged.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        }),
        catchError((error) => {
          this.userLogged.next(null);
          localStorage.removeItem('userData');
          this.router.navigate(['/login']);
          throw error;
        })
      );
  }

  autoLogin(): void {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.accessToken) {
      this.userLogged.next(userData);
    }
  }

  getUserDetails(): Observable<UserDetails> {
    return this.userLogged.asObservable().pipe(
      map((user) => {
        return {
          idUser: user.userDetails.userId,
          username: user.userDetails.username,
        };
      })
    );
  }

  isAuthenticated(): Boolean {
    if (this.userLogged.value !== null) return true;
    else return false;
  }

  private redirectUserByRole(role: Role): void {
    switch (role) {
      case Role.ADMIN:
        this.router.navigate(['/menu/users']);
        break;
      case Role.DOCTOR:
        this.router.navigate(['/menu/view']);
        break;
      default:
        this.router.navigate(['/menu/appointment']);
    }
  }
}
