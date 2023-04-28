import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './utils/validators';
import { Subscription } from 'rxjs';
import { RegisterService } from './services/register.service';
import { FormatDate } from '../shared/utils/format-date';
import { ToastService } from '../shared/components/toasts-container/toasts.service';

@Component({
  selector: 'ado-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  stepOneSubmitted = false;
  stepTwoSubmitted = false;
  passwordMissMatch = false;
  private registerSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toasts: ToastService
  ) {}

  ngOnInit(): void {
    this.stepOneSubmitted = false;
    this.stepTwoSubmitted = false;

    this.accountForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(8),
            CustomValidators.passwordValidator,
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.maxLength(25),
            Validators.minLength(8),
            CustomValidators.passwordValidator,
          ],
        ],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        phone: ['', Validators.required],
        allergies: [''],
        diseases: [''],
        dateOfBirth: [''],
      },
      { validators: [CustomValidators.confirmPasswordValidator()] }
    );

    this.accountForm.valueChanges.subscribe((value) => {
      if (this.accountForm.errors) {
        this.passwordMissMatch = true;
      } else {
        this.passwordMissMatch = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) this.registerSubscription.unsubscribe();
  }

  submitStepOne(): void {
    this.stepOneSubmitted = true;
    this.stepTwoSubmitted = false;
  }

  backToStepOne(): void {
    this.stepOneSubmitted = false;
    this.stepTwoSubmitted = false;
  }

  submitStepTwo(): void {
    this.stepOneSubmitted = true;
    this.stepTwoSubmitted = true;
  }

  backToStepTwo(): void {
    this.stepOneSubmitted = true;
    this.stepTwoSubmitted = false;
  }

  submitStepThree(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
    this.registerSubscription = this.registerService
      .registerPatient({
        firstName: this.accountForm.get('firstName').value,
        lastName: this.accountForm.get('lastName').value,
        username: this.accountForm.get('username').value,
        email: this.accountForm.get('email').value,
        gender: this.accountForm.get('gender').value,
        role: 'USER',
        password: this.accountForm.get('password').value,
        allergies: this.accountForm.get('allergies').value,
        phone: this.accountForm.get('phone').value,
        diseases: this.accountForm.get('diseases').value,
        dateOfBirth: FormatDate.convertNgbDateToStringDate(
          this.accountForm.get('dateOfBirth').value
        ),
      })
      .subscribe(() => {
        this.accountForm.reset();
      });
  }
}
