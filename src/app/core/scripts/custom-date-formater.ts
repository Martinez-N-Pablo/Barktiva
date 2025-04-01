import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // Show days of the week with the first letter in uppercase in month view
  public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return format(date, 'EEEEE', { locale: es });
  }

  public override monthViewTitle({ date, locale }: DateFormatterParams): string {
    return format(date, 'MMM yyyy', { locale: es });
  }
  
  // Show the first letter in uppercase only in week view
  public override weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return format(date, 'EEEEE', { locale: es });
  }

  // Override the week view title to show the first letter in uppercase only, not the number and month
  public override weekViewColumnSubHeader(): string {
    return '';
  }

  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return format(date, 'HH:mm', { locale: es });
  }

  // public override weekViewTitle({ date }: DateFormatterParams): string {
  //   const start = format(date, 'd MMM', { locale: es });
  //   const end = format(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6), 'd MMM yyyy', { locale: es });
  //   return `${start} – ${end}`;
  // }

  // public override dayViewTitle({ date }: DateFormatterParams): string {
  //   return format(date, 'EEEE d MMMM yyyy', { locale: es });
  // }
}