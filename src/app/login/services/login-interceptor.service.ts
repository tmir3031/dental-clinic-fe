import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/services/login.service';

@Injectable()
export class LoginInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.authService.userLogged.value
      ? this.authService.userLogged.value.accessToken
      : null;

    if (
      token != null &&
      !['login', 'refresh'].some((url) => req.url.includes(url))
    ) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }
  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const refreshToken = this.authService.userLogged.value.refreshToken;

      if (refreshToken) {
        return this.authService.refresh().pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(response.accessToken);

            return next.handle(
              this.addTokenHeader(request, response.accessToken)
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.authService.logout();
            return throwError(err);
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
  private addTokenHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<Object> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
