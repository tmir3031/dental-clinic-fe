import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Role } from '../login/models/login.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'ado-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  authorizationRole: Role;
  username: string;

  private loginSubscription: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginSubscription = this.loginService.userLogged.subscribe((user) => {
      if (user) {
        this.username = user.userDetails.username;
        this.authorizationRole = user.userDetails.role;
      } else {
        this.username = null;
        this.authorizationRole = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

}
