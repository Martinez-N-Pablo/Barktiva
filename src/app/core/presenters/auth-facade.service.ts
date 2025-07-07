import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { firstValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ToasSuccessMessage, ToastErorMessage } from '../const/magicStrings';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private _authService: AuthService = inject(AuthService);
  private _toastService: ToastService = inject(ToastService);

  constructor() { }

  async login(credentials: {email: string, password: string}): Promise<boolean> {
    return firstValueFrom(this._authService.login(credentials))
    .then(async response => {
      // Se almacenan los datos
      if (response?.token) {
        await Preferences.set({
          key: 'user',
          value: JSON.stringify({
            token: response.token || "",
            name: response.name || "",
            surname: response.surname || "",
            role: response.role || ""
          }),
        });

        this._toastService.showToast(ToasSuccessMessage.login || "", 'success').then(() => true);
        return response;
      } else {
        return this._toastService.showToast(ToastErorMessage.login, 'danger').then(() => false);
      }
    })
    .catch(() => {
      return this._toastService.showToast(ToastErorMessage.login, 'danger').then(() => false);
    });
  };

  async verifyToken(): Promise<any> {
    const { value } = await Preferences.get({ key: 'user' });

    if(!value) {
      return this._toastService.showToast(ToastErorMessage.login || "", 'danger').then(() => false);
    }

    const user = JSON.parse(value as string);

    return firstValueFrom(this._authService.validateToken(user.token || ""))
      .then(response => {
        return true;
      })
      .catch(() => {
        return this._toastService.showToast(ToastErorMessage.permissions || "", 'danger').then(() => false);
      });
  }

  // Use in guest guard, try to get user from local storage, if it did no exits, return false, in the other case, try to validate it
  async isTokenStillValid(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'user' });
    if (!value) return false;
    const user = JSON.parse(value);
    return firstValueFrom(this._authService.validateToken(user.token || ''))
      .then(() => true)
      .catch(() => false);
  }

  async logout(): Promise<boolean> {
    try {
      await Preferences.remove({ key: 'user' });
      this._toastService.showToast(ToasSuccessMessage.logout || "", 'success').then(() => false);
      return true;
    } catch (error) {
      this._toastService.showToast(ToastErorMessage.logout || "", 'danger').then(() => false);
      return false;
    }
  }
}
