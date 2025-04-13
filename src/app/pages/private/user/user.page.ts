import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonFooter, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonFooter, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UserPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  redirectToEditProfile() {}

  redirectToChangePassword() {}

  confirmDeleteAccount() {}
}
