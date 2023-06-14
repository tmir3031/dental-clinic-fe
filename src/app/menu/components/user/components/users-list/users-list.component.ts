import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserAccountDto } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { PatientContactDTO } from 'src/app/shared/models/patient.model';

@Component({
  selector: 'ado-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() users?: UserAccountDto[] | null;
  @Input() usersSubject = new BehaviorSubject<UserAccountDto[]>([]);
}
