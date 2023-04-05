import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from '../login/models/login.model';
import { LoginService } from '../shared/services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ado-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    form?: FormGroup;
    username?: string;
    userId?: string;
    team?: string;
    authorizationRole?: Role;
    private loginSubscription = new Subscription();

    constructor(
        private loginService: LoginService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initForm();
        this.loginSubscription = this.loginService.userLogged.subscribe(
            user => {
                if (user) {
                    this.userId = user.userDetails.userId;
                    this.username = user.userDetails.username;
                    const roles = user.userDetails.role;
                    this.setUserDetailsByRole(roles);
                } else {
                    this.username = undefined;
                    this.authorizationRole = undefined;
                    this.team = undefined;
                }
            }
        );
        this.setInitialFilters();
        this.form?.disable();
    }

    ngOnDestroy(): void {
        this.loginSubscription.unsubscribe();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            username: [''],
            role: [''],
        });
    }

    private setInitialFilters(): void {
        this.form?.patchValue({
            username: this.username,
            role: this.authorizationRole,
        });
    }

    private setUserDetailsByRole(role: Role) {
        if (role.includes(Role.ADMIN)) {
            this.authorizationRole = Role.ADMIN;
        } else if (role.includes(Role.DOCTOR)) {
            this.authorizationRole = Role.DOCTOR;
        } else if (role.includes(Role.USER)) {
            this.authorizationRole = Role.USER;
        }
    }


}
