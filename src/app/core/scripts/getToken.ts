import { Preferences } from "@capacitor/preferences";
import { ToastErorMessage } from "../const/magicStrings";
import { inject } from "@angular/core";
import { ToastService } from "../services/toast.service";

export async function getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'user' });
    const _toastService = inject(ToastService);
    
    if(!value) {
        _toastService.showToast(ToastErorMessage.login || "", 'danger').then(() => false);
        return null;
    }

    return JSON.parse(value as string).token;
}