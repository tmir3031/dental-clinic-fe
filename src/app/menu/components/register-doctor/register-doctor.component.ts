import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegisterDoctorService } from './services/register-doctor.service';
import { SpecializationService } from 'src/app/shared/services/specialization.service';
import { SpecializationDto } from 'src/app/shared/models/specialization.model';

@Component({
  selector: 'ado-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit, OnDestroy {

  accountForm: FormGroup;
  specializations: SpecializationDto[];
  private readonly subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private registerDoctorService: RegisterDoctorService,
    private specializationService: SpecializationService,
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.subscription.add(
      this.specializationService
        .getSpecialization()
        .subscribe(
          (data) => (
            (this.specializations = data),
            this.specializations.push({ id: 100, name: 'Toate', v: 0 })
          )
        )
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }



  createDoctorAccount(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription.add(this.registerDoctorService
      .registerDoctor({
        firstName: this.accountForm.get('firstName').value,
        lastName: this.accountForm.get('lastName').value,
        username: this.accountForm.get('username').value,
        email: this.accountForm.get('email').value,
        gender: this.accountForm.get('gender').value,
        role: 'DOCTOR',
        specializationIds: [this.accountForm.get('specializationId1').value,2],
        description: this.accountForm.get('description').value,
       
      })
      .subscribe(() => {
        this.accountForm.reset();
      }));
  }

  private initFormGroup(): void {
    this.accountForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        description: ['', Validators.required],
        specializationId1: [100],
        specializationId2: [100],
        specializationId3: [100],
      }
    );
  }

}
