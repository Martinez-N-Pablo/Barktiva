import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonItem } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogoComponent } from '@app/shared/components/logo/logo.component';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonInput,
    IonButton, 
    IonList, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    LogoComponent
  ]
})
export class SingupPage implements OnInit {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  private _subscriptions: Subscription[] = [];
  
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  title: string = Titles.singup;
  logoPath: string = RoutesName.path;
  
  singupForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this._initSingupForm();
  }

  private _initSingupForm(): void {
    this.singupForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(20)]),
    });
  }
  
  singup(): void { }

  redirectToLogin (): void {
      this._router.navigate([`/${RoutesName.login}`]);
    }
}
