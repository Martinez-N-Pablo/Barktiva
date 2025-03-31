import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { LogoComponent } from '../shared/components/logo/logo.component';
import { RoutesName } from '@app/core/magicStrings';
import { ScheludeComponent } from '@app/shared/components/schelude/schelude.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, LogoComponent, ScheludeComponent],
})
export class HomePage {
  private _router: Router = inject(Router);

  logoPath: string = RoutesName.login;
  
  constructor() {}

  navigateToLogin() {
    this._router.navigate([`/${RoutesName.login}`]);
  }
}
