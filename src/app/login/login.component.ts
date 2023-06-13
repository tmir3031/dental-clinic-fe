import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'ado-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  credentialsInvalid = false;

  private loginSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onLogin(): void {
    this.loginSubscription = this.loginService
      .login(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      )
      .pipe(
        catchError((errorResponse) => {
          const error = errorResponse.error.errors[0];
          if (error.errorCode === 'KEYCLOAK_LOGIN_INVALID_CREDENTIALS') {
            this.credentialsInvalid = true;
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.credentialsInvalid = false;
      });
  }
}
