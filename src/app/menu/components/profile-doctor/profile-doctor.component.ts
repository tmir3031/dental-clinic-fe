import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DoctorDto } from 'src/app/shared/models/doctor.model';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'ado-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.scss'],
})
export class ProfileDoctorComponent implements OnInit, OnDestroy {
  form?: FormGroup;
  doctor: DoctorDto;
  private userSubscription = new Subscription();

  constructor(
    private doctorService: DoctorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.userSubscription = this.doctorService
      .getDoctorDetails()
      .subscribe((data) => {
        this.doctor = data;
        this.setInitialValue();
      });
    this.form?.disable();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: [''],
      email: [''],
      name: ['', Validators.required],
      description: [''],
      specializations: [''],
      gender: [''],
    });
  }

  private setInitialValue(): void {
    var specializations = this.doctor?.specializationDetailsListItem;
    var mySpecializations = '';
    for (var i = 0; i < specializations.length; i++) {
      if (i > 0) {
        mySpecializations += ', ';
      }
      mySpecializations += specializations[i].name;
    }
    var name = this.doctor?.lastName + ' ' + this.doctor.firstName;
    this.form?.patchValue({
      username: this.doctor?.username,
      email: this.doctor?.email,
      name: name,
      description: this.doctor?.description,
      specializations: mySpecializations,
      gender: this.doctor?.gender.toLowerCase(),
    });
  }
}
