import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton, 
    IonContent,
    CommonModule,
    FormsModule,
  ]
})
export class UserPage implements OnInit {
  private _alertController: AlertController = inject(AlertController);
  constructor() { }

  ngOnInit() {
  }

  redirectToEditProfile() {}

  redirectToChangePassword() {}

  /**
   * * Confirm delete account action with modal
   */
  async confirmDeleteAccount() {
    const alert = await this._alertController.create({
      header: '¿Estás seguro?',
      message: 'Esta acción eliminará tu cuenta de forma permanente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.deleteAccount()
        }
      ]
    });

    await alert.present();
  }

  deleteAccount() {
    console.log('Cuenta eliminada');
  }
}

