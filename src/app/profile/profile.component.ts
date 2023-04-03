import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from '../login/models/login.model';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'ado-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  authorizationRole?: Role;
  username?: string;
  userId?: string;
  private loginSubscription = new Subscription();

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
      this.loginSubscription = this.loginService.userLogged.subscribe(
          user => {
              if (user) {
                  this.userId = user.userDetails.userId;
                  this.username = user.userDetails.username;
                  const role = user.userDetails.role;
                  if (role.includes(Role.ADMIN)) {
                      this.authorizationRole = Role.ADMIN;
                  } else if (role.includes(Role.DOCTOR)) {
                      this.authorizationRole = Role.DOCTOR;
                  } else if (role.includes(Role.USER)) {
                      this.authorizationRole = Role.USER;
                  }
              } else {
                  this.username = undefined;
                  this.authorizationRole = undefined;
              }
          }
      );
  }

  ngOnDestroy(): void {
      this.loginSubscription.unsubscribe();
  }


}
