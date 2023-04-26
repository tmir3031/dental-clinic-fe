import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/login/models/login.model';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'ado-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy  {
  authorizationRole: Role;
  username: string;

  private loginSubscription: Subscription;

  constructor(private loginService: LoginService, private offcanvasService: NgbOffcanvas) {}

  ngOnInit(): void {
    this.loginSubscription = this.loginService.userLogged.subscribe((user) => {
      if (user) {
        this.username = user.userDetails.username;
        this.authorizationRole = user.userDetails.role;
      } else {
        this.username = null;
        this.authorizationRole = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  openScroll(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { scroll: true });
	}

  onLogout(): void {
    this.loginService.logout();
  }
}
