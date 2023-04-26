import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { PasswordStrengthMeterComponent } from './components/password-strength-meter/password-strength-meter.component';

@NgModule({
  imports: [CommonModule, SharedModule, RegisterRoutingModule],
  declarations: [RegisterComponent, PasswordStrengthMeterComponent],
})
export class RegisterModule {}
