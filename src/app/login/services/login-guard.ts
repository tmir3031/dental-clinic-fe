import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from '../../shared/services/login.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivateChild {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.loginService.userLogged.pipe(
      take(1),
      map((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        if (
          childRoute.data.roles &&
          childRoute.data.roles.indexOf(user.userDetails.role) === -1
        ) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      })
    );
  }
}
