import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ToastErorMessage } from '../const/magicStrings';
import { ToxicService } from '../services/toxic.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ToxicFacadeService {
  private _toxicService: ToxicService = inject(ToxicService);
  private _toastService: ToastService = inject(ToastService);
  
  constructor() { }

  async getAllToxics(): Promise<any> {
      return firstValueFrom(this._toxicService.getToxics())
        .then(response => {
          return response.toxics || [];
        })
        .catch(() => {
            return this._toastService.showToast(ToastErorMessage.getToxics || "", 'danger').then(() => false);
          });
    }
}
