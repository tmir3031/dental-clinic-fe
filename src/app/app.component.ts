import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'ado-root',
  template: ` <router-outlet></router-outlet> <ado-toasts-container></ado-toasts-container> <ado-core-loader></ado-core-loader>`,
})
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
      this.loginService.autoLogin();
  }

}
