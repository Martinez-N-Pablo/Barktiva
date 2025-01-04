import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonImg, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private _router: Router = inject(Router);
  
  constructor() {}

  navigateToLogin() {
    this._router.navigate(['/login']);
  }
}
