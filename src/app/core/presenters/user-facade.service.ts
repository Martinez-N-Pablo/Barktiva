import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { AuthFacadeService } from '@app/core/presenters/auth-facade.service';
import { ToastService } from '../services/toast.service';
import { ToastErorMessage } from '../const/magicStrings';
import { ToasSuccessMessage } from '../const/magicStrings';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  private _userService: UserService = inject(UserService);
  private _authFacade: AuthFacadeService = inject(AuthFacadeService);
  private _toastService: ToastService = inject(ToastService);

  constructor() { }

  async createUser(body: any): Promise<boolean> {
    const {email, password} = body;
    
    return firstValueFrom(this._userService.createUser(body))
    .then(async response => {
      
      const logged = await this._authFacade.login({email, password});

      if(!logged) {
        return false;
      }

      this._toastService.showToast(ToasSuccessMessage.register || "", 'success').then(() => true);
      return true;
    })
    .catch(() => {
      return this._toastService.showToast(ToastErorMessage.register || "", 'danger').then(() => false);
    })
  };
    
  
}
