import { NgModule } from '@angular/core';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  imports: [FlatpickrModule.forRoot()],
  exports: [FlatpickrModule]
})

export class FlatPickrModuleModule { }
