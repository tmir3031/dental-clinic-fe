import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationToast, NotificationType } from './models/toasts.model';

@Injectable({ providedIn: 'root' })
export class ToastService implements OnDestroy {
  private _toastSubject = new BehaviorSubject<NotificationToast | null>(null);

  public get toastSubject(): Observable<NotificationToast | null> {
    return this._toastSubject.asObservable();
  }

  showStandard(message: string): void {
    this.show(message);
  }

  showSuccess(message: string): void {
    this.show(message, NotificationType.SUCCESS, {
      className: 'text-success bg-success-light',
      delay: 5000,
    });
  }

  showError(message: string): void {
    this.show(message, NotificationType.ERROR, {
      className: 'text-danger bg-danger-light',
      delay: 5000,
    });
  }

  showWarning(message: string): void {
    this.show(message, NotificationType.WARNING, {
      className: 'text-primary bg-warning-light',
      delay: 5000,
    });
  }

  showInfo(message: string): void {
    this.show(message, NotificationType.INFO, {
      className: 'bg-info text-dark',
      delay: 5000,
    });
  }

  remove(): void {
    this._toastSubject.next(null);
  }

  ngOnDestroy(): void {
    this.remove();
  }

  private show(
    message: string,
    type: NotificationType = NotificationType.STANDARD,
    options = {}
  ): void {
    this._toastSubject.next({ message, type, ...options });
  }
}
