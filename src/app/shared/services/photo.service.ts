import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { environment } from 'src/environments/environment';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageModel } from '../models/image.model';
import { EMPTY, Observable } from 'rxjs';
import { ToastService } from '../components/toasts-container/toasts.service';

@Injectable({ providedIn: 'root' })
export class FotoService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    private toastService: ToastService
  ) {}

  saveImage(image: File, userId: string) {
    const formData = new FormData();
    formData.append('image', image);
    this.http
      .post(
        `${environment.apiUrl}/core/api/v1/doctors/save-image/${userId}`,
        formData
      )
      .pipe(
        catchError(() => {
          this.toastService.showError('A intervenit o eroare');
          return EMPTY;
        })
      )
      .subscribe();
  }

  getImageForAPatient(): Observable<ImageModel> {
    return this.loginService.userLogged.pipe(
      switchMap((user) => {
        return this.http
          .get<ImageModel>(
            `${environment.apiUrl}/core/api/v1/doctors/view-image/${user.userDetails.userId}`
          )
          .pipe(
            map((radiography) => {
              radiography.image = this.sanitizer.bypassSecurityTrustResourceUrl(
                'data:image/png;base64, ' + radiography.image
              );
              return radiography;
            })
          );
      })
    );
  }

  getImage(userId: string): Observable<ImageModel> {
    return this.http
      .get<ImageModel>(
        `${environment.apiUrl}/core/api/v1/doctors/view-image/${userId}`
      )
      .pipe(
        map((radiography) => {
          radiography.image = this.sanitizer.bypassSecurityTrustResourceUrl(
            'data:image/png;base64, ' + radiography.image
          );
          radiography.date = radiography.date;
          return radiography;
        })
      );
  }

  getAllImagesForAPatient(): Observable<ImageModel[]> {
    return this.loginService.userLogged.pipe(
      switchMap((user) => {
        return this.http
          .get<ImageModel[]>(
            `${environment.apiUrl}/core/api/v1/doctors/view-all-image/${user.userDetails.userId}`
          )
          .pipe(
            map((images) => {
              return images.map((radiography) => {
                radiography.image =
                  this.sanitizer.bypassSecurityTrustResourceUrl(
                    'data:image/png;base64, ' + radiography.image
                  );
                return radiography;
              });
            })
          );
      })
    );
  }

  getAllImagesForAPatientForADoctor(userId: string): Observable<ImageModel[]> {
    return this.http
      .get<ImageModel[]>(
        `${environment.apiUrl}/core/api/v1/doctors/view-all-image/${userId}`
      )
      .pipe(
        map((radiographies) => {
          return radiographies.map((radiography) => {
            radiography.image = this.sanitizer.bypassSecurityTrustResourceUrl(
              'data:image/png;base64, ' + radiography.image
            );
            return radiography;
          });
        })
      );
  }
}
