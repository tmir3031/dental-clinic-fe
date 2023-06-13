import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesComponent } from './prices.component';
import { SharedModule } from '../shared/shared.module';
import { PricesRoutingModule } from './prices-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, PricesRoutingModule],
  declarations: [PricesComponent],
})
export class PricesModule {}
