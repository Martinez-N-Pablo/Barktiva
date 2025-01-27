import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonItem } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogoComponent } from '@app/shared/components/logo/logo.component';
import { SecondaryButtonComponent } from '@app/shared/components/secondary-button/secondary-button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { validateForm } from '@app/core/scripts/validate-forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    InputComponent,
    IonList, 
    IonContent, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    LogoComponent,
    SecondaryButtonComponent,
  ]
})
export class SingupPage implements OnInit, OnDestroy {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  logoContainerWidth = '40%';

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

  ngOnDestroy(): void {
    
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
  
  singup(): void {
    this.singupForm.markAllAsTouched();
    validateForm(this.singupForm);
    
    if (this.singupForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    // Call to the service to login
    this._router.navigate([`/${RoutesName.petForm}`]);
  }

  redirectToLogin (): void {
    this._router.navigate([`/${RoutesName.login}`]);
  }

  getControl(controlName: string): FormControl{
    return this.singupForm.get(controlName) as FormControl;
  }
}
