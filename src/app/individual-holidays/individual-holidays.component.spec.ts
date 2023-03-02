import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualHolidaysComponent } from './individual-holidays.component';

describe('IndividualHolidaysComponent', () => {
  let component: IndividualHolidaysComponent;
  let fixture: ComponentFixture<IndividualHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualHolidaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
