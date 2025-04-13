import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonImg, IonThumbnail, IonButtons, IonText } from '@ionic/angular/standalone';
import { RoutesName } from '@app/core/magicStrings';
import { ScheludeComponent } from '@app/shared/components/schelude/schelude.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonText, 
    IonButtons, 
    IonImg,
    IonLabel,
    ScheludeComponent, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonThumbnail,
    IonButton,
    IonIcon,
  ]
})
export class DashboardPage implements OnInit {
  logoPath: string = RoutesName.login;

  dogs: any[] = [
    { name: 'Dog 1', photo: "../../../../../assets/icon/logo.png" },
    { name: 'Dog 2', photo: "../../../../../assets/icon/logo.png" },
    { name: 'Dog 3', photo: "../../../../../assets/icon/logo.png" },
    { name: 'Dog 4', photo: "../../../../../assets/icon/logo.png" },

  ];

  private _router: Router = inject(Router);

  constructor() { }

  ngOnInit() {
  }

  goToProfile() {
//    console.log('goToProfile: ' + RoutesName.user);
    this._router.navigate(['user']);
  }

}
