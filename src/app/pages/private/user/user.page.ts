import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon, IonHeader, IonBackButton, IonToolbar, IonButtons, IonLabel } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { ChangePasswordComponent } from '@app/shared/components/change-password/change-password.component';
import { UserProfileComponent } from '@app/shared/components/user-profile/user-profile.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { Router } from '@angular/router';
import { c } from '@angular/core/event_dispatcher.d-pVP0-wST';
import { RoutesName } from '@app/core/magicStrings';

export const USER_MENU_OPTIONS = {
  EDIT_PROFILE: 1,
  CHANGE_PASSWORD: 2,
}

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButtons, IonToolbar, IonBackButton, IonHeader, 
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
  private _router: Router = inject(Router);

  goBackText: string = 'Volver';

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

  goBack() {
    if(this.optionSelected !== -1) {
      this.optionSelected = -1;
      return;
    }
    
    this._router.navigate([`/${RoutesName.dashboard}`]);
  }
}

