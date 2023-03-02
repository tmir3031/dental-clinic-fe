import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AboutUsRoutingModule
  ],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
