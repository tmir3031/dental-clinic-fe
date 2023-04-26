import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'ado-dental-services',
  templateUrl: './dental-services.component.html',
  styleUrls: ['./dental-services.component.scss'],
})
export class DentalServicesComponent {
  constructor() {}

  isMenuScrolled = false;
  @HostListener('window:scroll', ['$event'])
  scrollCheck() {
    this.isMenuScrolled = window.pageYOffset > 100;
  }
  scrollToTop() {
    document.body.scrollIntoView({ behavior: 'smooth' });
  }
}
