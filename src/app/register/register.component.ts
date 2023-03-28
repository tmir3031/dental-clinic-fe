import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ado-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  accountForm: FormGroup;
  stepOneSubmitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  submitStepOne(): void {
    this.stepOneSubmitted = true;
  }

  backToStepOne(): void {
    this.stepOneSubmitted = false;
  }

  submitStepTwo(): void {
    console.log(this.accountForm.value);
  }
}
