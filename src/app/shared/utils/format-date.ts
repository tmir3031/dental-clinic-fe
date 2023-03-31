import { DatePipe } from '@angular/common';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from './constants';

export class FormatDate {
  static convertDateToStringDate(date: Date): string {
    return new DatePipe(Constants.DATE_PIPE_LOCALE).transform(date, Constants.FORMAT_STRING_DATE);
  }

  static convertNgbDateToStringDate(ngbDate: NgbDate): string {
    const newDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    return this.convertDateToStringDate(newDate);
  }

  static convertStringDateToNgbDate(date: string): NgbDate {
    const dateParsed = date.split('-');
    return new NgbDate(+dateParsed[0], +dateParsed[1], +dateParsed[2]);
  }

  static convertDateToNgbDate(date: Date): NgbDate {
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  static convertNgbDateToDate(date: NgbDate): Date{
    return new Date(date.year, date.month - 1, date.day);
  }

  static subtractDaysFromDate(date: string, days: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return this.convertDateToStringDate(newDate);
  }

  static addDaysToDate(date: string, days: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return this.convertDateToStringDate(newDate);
  }

  static getFirstDayOfMonth(date: Date): string {
    return this.convertDateToStringDate(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  static getLastDayOfMonth(date: Date): string {
    return this.convertDateToStringDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  }

  static getLastDayOfMonthAsNumber(date: Date): number{
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
}
