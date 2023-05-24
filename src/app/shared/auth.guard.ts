import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: LoginService, private router: Router) {}

  canActivate(): boolean {
    console.log(this.service.isAuthenticated())
    if (!this.service.isAuthenticated()) {
      this.router.navigate(['/login']);
      //return true;
    }
    this.router.navigate(['/menu']);
    return false;
  }
}
