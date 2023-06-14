import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.service.isAuthenticated();
    if (isAuthenticated) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
