import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonItem, IonList, IonFooter } from '@ionic/angular/standalone';
import { LogoComponent } from '@app/shared/components/logo/logo.component';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Router } from '@angular/router';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { validateForm } from '@app/core/scripts/validate-forms';
import { AuthFacadeService } from '@app/core/presenters/auth-facade.service';

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
  private _authFacade: AuthFacadeService = inject(AuthFacadeService);

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

  async login(): Promise<void> {
    this.formSubmited = true;
    this.loginForm.markAllAsTouched();

    // validateForm(this.loginForm);
    if (this.loginForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    const logged = await this._authFacade.login(this.loginForm.value);

    if(logged) {
      this._router.navigate([`/${RoutesName.dashboard}`]);
    }
  }

  redirectToRegister(): void {
    this._router.navigate([`/${RoutesName.singup}`]);
  }

  
  getControl(controlName: string): FormControl{
    return this.loginForm.get(controlName) as FormControl;
  }
}
