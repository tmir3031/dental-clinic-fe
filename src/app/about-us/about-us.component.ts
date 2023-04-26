import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from '../shared/services/doctor.service';
import { DoctorDto } from '../shared/models/doctor.model';

@Component({
  selector: 'ado-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {
  public doctors: DoctorDto[];
  private subscription: Subscription;
  constructor(private service: DoctorService) { }

  ngOnInit(): void {
    this.subscription = this.service.getDoctors().subscribe((data) => {
          this.doctors = data;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isMenuScrolled = false;
  @HostListener('window:scroll', ['$event'])
  scrollCheck() {
    this.isMenuScrolled = window.pageYOffset > 100;
  }
  scrollToTop() {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }

}
