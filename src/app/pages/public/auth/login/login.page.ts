import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonButton, IonFooter } from '@ionic/angular/standalone';
import { LogoComponent } from '@app/shared/components/logo/logo.component';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Router } from '@angular/router';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { validateForm } from '@app/core/scripts/validate-forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonFooter, 
    IonList, 
    IonItem, 
    IonContent, 
    CommonModule, 
    FormsModule, 
    LogoComponent,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent
  ]
})
export class LoginPage implements OnInit {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  logoPath: string = RoutesName.home;
  logoContainerWidth: string = '40%';
  
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  title: string = Titles.login;

  formSubmited: boolean = false; 

  loginForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this._initLoginForm();
  }

  // When the user leaves the view, clean the form errors
  ionViewWillLeave(): void {
    this.formSubmited = false;
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  private _initLoginForm(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login(): void {
    this.formSubmited = true;
    this.loginForm.markAllAsTouched();
    // validateForm(this.loginForm);
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      console.log(this.loginForm.get('email')?.invalid
    );
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
