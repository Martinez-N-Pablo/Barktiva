import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { LogoComponent } from '@app/shared/components/logo/logo.component';
import { ErrorMessages, PlaceholderMessages } from '@app/core/magicStrings';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, 
    IonList, 
    IonItem, 
    IonInput, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    LogoComponent
  ]
})
export class LoginPage implements OnInit {
  logoPath: string = 'home';
  
  errorMessages: any = ErrorMessages;
  placeholderMessages: { [key: string]: string } = PlaceholderMessages;

  loginForm!: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  redirectToRegister() {}

}
