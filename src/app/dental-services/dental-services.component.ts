import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'ado-dental-services',
  templateUrl: './dental-services.component.html',
  styleUrls: ['./dental-services.component.scss']
})
export class DentalServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log()
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
