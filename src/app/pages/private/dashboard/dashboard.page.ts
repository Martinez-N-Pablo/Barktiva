import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg, IonThumbnail } from '@ionic/angular/standalone';
import { RoutesName } from '@app/core/const/magicStrings';
import { ScheludeComponent } from '@app/components/schelude/schelude.component';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';

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
    CommonModule, 
    FormsModule,
    IonThumbnail,
    HeaderComponent,
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

  petTitle: string = "Perros";
  taskTitle: string = "Tareas";

  private _router: Router = inject(Router);

  constructor() { }

  ngOnInit() {
  }
}
