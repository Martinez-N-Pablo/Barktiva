import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonHeader, IonBackButton, IonToolbar, IonButtons } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { ChangePasswordComponent } from '@app/shared/components/change-password/change-password.component';
import { UserProfileComponent } from '@app/shared/components/user-profile/user-profile.component';

export const USER_MENU_OPTIONS = {
  EDIT_PROFILE: 0,
  CHANGE_PASSWORD: 1,
  DELETE_ACCOUNT: 2
}

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonButtons, IonToolbar, IonBackButton, IonHeader, 
    IonIcon,
    IonButton, 
    IonContent,
    CommonModule,
    FormsModule,
    UserProfileComponent,
    ChangePasswordComponent,
  ]
})
export class UserPage implements OnInit {
  private _alertController: AlertController = inject(AlertController);

  optionSelected: number = -1;

  userMenuOptions = USER_MENU_OPTIONS;

  constructor() { }

  ngOnInit() {
  }

  redirectToEditProfile() {
    this.optionSelected = this.userMenuOptions.EDIT_PROFILE;
  }

  redirectToChangePassword() {
    this.optionSelected = this.userMenuOptions.CHANGE_PASSWORD;
  }

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

