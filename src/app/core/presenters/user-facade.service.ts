import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { firstValueFrom } from 'rxjs';
import { AuthFacadeService } from '@app/core/presenters/auth-facade.service';
import { ToastService } from '../services/toast.service';
import { ToastErorMessage } from '../const/magicStrings';
import { ToasSuccessMessage } from '../const/magicStrings';
import { Preferences } from '@capacitor/preferences';

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
    .catch((error: any) => {
      return this._toastService.showToast((error?.status !== 409) ? ToastErorMessage.register || "" : ToastErorMessage.duplicateEmail || "", 'danger').then(() => false);
    })
  };

  async updateUser(body: any): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const user = JSON.parse(value as string);

    const userId: string = user.id || "";
    const token: string = user.token || "";

    const formData: FormData = new FormData();

    // Añadir todos los campos excepto el archivo
    Object.entries(body).forEach(([key, val]) => {
      if (key !== 'photo' && val !== undefined && val !== null) {
        formData.append(key, val as string);
      }
    });

    const photo = body?.photo || undefined;

    // Se comprueba si la variable photo contiene valor y se comprueba como se ha podido que es un objeto tipo File
    if (photo &&
        typeof photo === 'object' &&
        'name' in photo &&
        'type' in photo &&
        'size' in photo
    ) {
      formData.append('photo', photo);
    }

    if(token) {
      return firstValueFrom(this._userService.updateUser(formData, token))
        .then(response => {
          this._toastService.showToast(ToasSuccessMessage.updateUser || "", 'success').then(() => true);
          return true;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.updateUser || "", 'danger').then(() => false);
        });
    }
  }

  async getUserData(): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return null;
    }

    const token = JSON.parse(value as string).token || "";

    if(!token) {
      this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
      return null;
    }

    
    return firstValueFrom(this._userService.getUserData(token))
      .then(response => {
        return response;
      })
      .catch(() => {
        return this._toastService.showToast(ToastErorMessage.getPetData || "", 'danger').then(() => false);
      });
  }

  async deleteUser(): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });
    
    if(!value) {
        this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
        return false;
    }

    const token = JSON.parse(value as string).token || "";

    if(token) {
      return firstValueFrom(this._userService.deleteUser(token))
        .then(response => {
          this._toastService.showToast(ToasSuccessMessage.deletePet || "", 'success').then(() => false);
          return response;
        })
        .catch(() => {
          return this._toastService.showToast(ToastErorMessage.deletePet || "", 'danger').then(() => false);
        });
    }
  }
}
