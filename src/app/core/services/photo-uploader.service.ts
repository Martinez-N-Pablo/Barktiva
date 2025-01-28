import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploaderService {
  private _plt: Platform = inject(Platform);
  private _htttp: HttpClient = inject(HttpClient);
  private _loadingCtrl: LoadingController = inject(LoadingController);
	private _toastCtrl: ToastController = inject(ToastController);

  private imageBase64: string | null = null;

  constructor() { }

  async selectImage(): Promise<string | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Obtenemos la imagen en formato Base64
        source: CameraSource.Photos, // Selecciona desde la galería
      });

      this.imageBase64 = `data:image/jpeg;base64,${image.base64String}`;
      return this.imageBase64;
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      return null;
    }
  }

   /**
   * Retorna la imagen seleccionada como Base64.
   */
   getSelectedImage(): string | null {
    return this.imageBase64;
  }
}
