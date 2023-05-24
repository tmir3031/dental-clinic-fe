import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { UserAccountDto, UserFilter } from './models/user.model';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientFilter } from '../patients-of-doctor/models/filter';
import { UserService } from './services/user-service';

@Component({
  selector: 'ado-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  users?: UserAccountDto[];
  filterUsersForm?: FormGroup;
  userObservable?: Observable<UserAccountDto[]>;

  private usersSubject = new BehaviorSubject<UserAccountDto[]>([]);
  private userSubscription: Subscription = new Subscription();
  private subscriptions = new Subscription();

  constructor(private readonly service: UserService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsersObservable();
  }

  private loadUsersObservable(): void {
    this.userObservable = this.service.getAllUsers().pipe(
      tap((data) => {
        this.users = data;
      }),
      switchMap(() =>
        combineLatest(this.getControlsValueChanges()).pipe(
          map<(string | UserFilter)[], UserFilter>(([search, role]) => {
            return {
              search,
              role
            } as UserFilter;
          })
        )
      ),
      tap((filters) => {
        if (filters) {
          this.usersSubject.next(this.filterData(filters));
        }
      }),
      switchMap<UserFilter, Observable<UserAccountDto[]>>(() => {
        return this.usersSubject.asObservable();
      })
    );
  }

  private getControlsValueChanges(): Observable<string | UserFilter>[] {
    const controls: Observable<string>[] = [];
    if (this.filterUsersForm) {
      Object.keys(this.filterUsersForm.controls).forEach((element) => {
        if (this.filterUsersForm) {
          controls.push(
            this.filterUsersForm
              .get(element)!
              .valueChanges.pipe(
                startWith(this.filterUsersForm?.get(element)!.value)
              )
          );
        }
      });
      return controls;
    }
    return [];
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  private initForm(): void {
    this.filterUsersForm = new FormGroup({
      search: new FormControl(''),
      role: new FormControl(''),
    });
  }

  private filterData(filterFormValue: UserFilter) {
    const filteredData = this.users!.filter((item) => {
      if (filterFormValue.search) {
        if (
          !item.firstName
            .toLowerCase()
            .includes(filterFormValue.search.toLowerCase()) &&
          !item.lastName
            .toLowerCase()
            .includes(filterFormValue.search.toLowerCase())
        ) {
          return false;
        }
      }
      if(filterFormValue.role){
        if (
          !item.role
            .toLowerCase()
            .includes(filterFormValue.role.toLowerCase()) &&
          !item.role
            .toLowerCase()
            .includes(filterFormValue.role.toLowerCase())
        ) {
          return false;
        }
      }

      return this.users;
    });

    return filteredData;
  }

}
