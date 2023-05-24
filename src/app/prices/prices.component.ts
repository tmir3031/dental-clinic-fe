import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PricesService } from './services/prices.service';
import { PriceDto } from './models/prices.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ado-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
})
export class PricesComponent implements OnDestroy, OnInit {
  selectedType: string;
  types = [
    'ORTODONȚIE',
    'TRATAMENTE PROTETICE',
    'TRATAMENTE ENDODONTICE',
    'CONSULTAȚII',
    'RADIOLOGIE',
    'TRATAMENTE ODONTALE',
    'COSMETICĂ DENTARĂ',
  ];
  public allPrices: PriceDto[];
  public prices: PriceDto[];
  private subscription: Subscription;
  constructor(private service: PricesService) {}

  ngOnInit(): void {
    this.subscription = this.service.getPricesForAType().subscribe((data) => {
      this.allPrices = data;
    });
  }

  selectType(type: string): void {
    this.selectedType = type;
    console.log("AICIIIII");
    this.prices = this.allPrices.filter((vl) => vl.type === type);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
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
