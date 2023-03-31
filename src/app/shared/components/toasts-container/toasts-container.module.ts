import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsContainerComponent } from './toasts-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbToastModule, BrowserModule],
  declarations: [ToastsContainerComponent],
  exports: [CommonModule, ToastsContainerComponent],

})
export class ToastNotificationsModule {}