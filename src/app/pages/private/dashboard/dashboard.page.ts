import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { RoutesName } from '@app/core/magicStrings';
import { ScheludeComponent } from '@app/shared/components/schelude/schelude.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [ScheludeComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LogoComponent]
})
export class DashboardPage implements OnInit {
  logoPath: string = RoutesName.login;

  constructor() { }

  ngOnInit() {
  }

}
