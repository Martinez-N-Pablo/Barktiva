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

  async selectImage(): Promise<File | null> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      if (!image.webPath) {
        throw new Error('La imagen no tiene una ruta válida');
      }

      const response = await fetch(image.webPath);
      const blob = await response.blob();
      const file = new File([blob], `photo_${Date.now()}.jpg`, {
        type: blob.type,
      });

      return file;
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
