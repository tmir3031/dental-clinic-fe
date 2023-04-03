import { Component, OnDestroy, OnInit } from '@angular/core';
import { PricesService } from './services/prices.service';
import { PriceDto } from './models/prices.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ado-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnDestroy {
  selectedType: string;
  isSelected = false;
  types = ["ORTODONȚIE", "TRATAMENTE PROTETICE", "TRATAMENTE ENDODONTICE", "CONSULTAȚII", "RADIOLOGIE", "TRATAMENTE ODONTALE", "COSMETICĂ DENTARĂ"]
  public prices: PriceDto[];
  private subscription: Subscription;
  constructor(private service: PricesService) { }


  selectType(type: string): void {
    this.isSelected = true;
    console.log("aci");
    this.selectedType = type;
    this.subscription = this.service.getPricesForAType(type).subscribe((data) => {
      this.prices = data;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription)
    this.subscription.unsubscribe();
  }

}
