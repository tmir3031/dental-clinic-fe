import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../shared/services/employee.service';
import { EmployeeDto } from './models/about-us.model';

@Component({
  selector: 'ado-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  employees?: EmployeeDto[];
  selectedEmployee: EmployeeDto;
  showEmployeeDetails = false;
  private subscription: Subscription;

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.subscription = this.service.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
