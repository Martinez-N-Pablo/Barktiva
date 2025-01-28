import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploaderService {
  private _plt: Platform = inject(Platform);
  private _htttp: HttpClient = inject(HttpClient);
  private _loadingCtrl: LoadingController = inject(LoadingController);
	private _toastCtrl: ToastController = inject(ToastController);

  constructor() { }
}
