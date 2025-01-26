import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton } from '@ionic/angular/standalone';
import { LogoComponent } from '@app/shared/components/logo/logo.component';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Router } from '@angular/router';
import { SecondaryButtonComponent } from '@app/shared/components/secondary-button/secondary-button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { validateForm } from '@app/core/scripts/validate-forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonList, 
    IonItem, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    LogoComponent,
    ReactiveFormsModule,
    SecondaryButtonComponent,
    InputComponent
  ]
})
export class LoginPage implements OnInit {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  logoPath: string = RoutesName.home;
  logoContainerWidth: string = '45%';
  
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  title: string = Titles.login;

  loginForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this._initLoginForm();
  }

  private _initLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    validateForm(this.loginForm);
    
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      console.log(this.loginForm.get('email')?.errors);
      return;
    }

    // Call to the service to login
    this._router.navigate([`/${RoutesName.petForm}`]);
  }

  redirectToRegister(): void {
    this._router.navigate([`/${RoutesName.singup}`]);
  }

  
  getControl(controlName: string): FormControl{
    return this.loginForm.get(controlName) as FormControl;
  }
}
