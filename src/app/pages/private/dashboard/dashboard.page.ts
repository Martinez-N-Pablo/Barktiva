import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonImg, IonThumbnail } from '@ionic/angular/standalone';
import { RoutesName } from '@app/core/magicStrings';
import { ScheludeComponent } from '@app/shared/components/schelude/schelude.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonLabel,
    ScheludeComponent, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonThumbnail
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


  constructor() { }

  ngOnInit() {
  }

}
