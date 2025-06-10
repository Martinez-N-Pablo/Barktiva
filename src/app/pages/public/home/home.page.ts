import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { RoutesName } from '@app/core/const/magicStrings';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    LogoComponent
  ],
})
export class HomePage {
  private _router: Router = inject(Router);

  logoPath: string = RoutesName.dashboard;
  
  constructor() {}

  navigateToLogin() {
    this._router.navigate([`/${RoutesName.login}`]);
  }
}
