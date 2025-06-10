import { NgModule } from '@angular/core';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { CustomDateFormatter } from '../scripts/custom-date-formater';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    })
  ],
  exports: [CalendarModule]
})

export class CalendarModuleModule { }
