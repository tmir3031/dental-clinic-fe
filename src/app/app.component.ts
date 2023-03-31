import { Component } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'ado-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
      this.loginService.autoLogin();
  }

}
