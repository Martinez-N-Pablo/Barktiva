import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonList, IonItem, IonFooter } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles, ToasSuccessMessage } from '@app/core/const/magicStrings';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogoComponent } from '@app/components/logo/logo.component';
import { ButtonComponent } from '@app/components/button/button.component';
import { InputComponent } from '@app/components/input/input.component';
import { validateForm } from '@app/core/scripts/validate-forms';
import { UserFacadeService } from '@app/core/presenters/user-facade.service';
import { ToastService } from '@app/core/services/toast.service';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
  standalone: true,
  imports: [
    IonFooter, 
    IonItem,
    InputComponent,
    IonList, 
    IonContent, 
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    LogoComponent,
    ButtonComponent,
  ]
})
export class SingupPage implements OnInit {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _userFacade: UserFacadeService = inject(UserFacadeService);
    private _toastService: ToastService = inject(ToastService);

    logContent: string = 'Hola';
    logContent2: any;
  

  logoContainerWidth = '40%';

  private _subscriptions: Subscription[] = [];
  
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  title: string = Titles.singup;
  logoPath: string = RoutesName.path;
  formSubmitted: boolean = false;
  
  singupForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this._initSingupForm();
  }

  // When the user leaves the view, clean the form errors
  ionViewWillLeave(): void {
    this.formSubmitted = false;
    Object.keys(this.singupForm.controls).forEach((key) => {
      const control = this.singupForm.get(key);
      control?.reset();
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  private _initSingupForm(): void {
    this.singupForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      // birthdate: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)]),
    }, { validators: this.passwordsMatchValidator } );
  }
  
  async singup() {
    this.formSubmitted = true;
    this.singupForm.markAllAsTouched();

    if (this.singupForm.invalid) {
      console.log('Formulario inválido');
      this.printFormErrors(this.singupForm);
      return;
    }

    let newUser = this.singupForm.value;
    newUser.role = "user";

    const singup = await this._userFacade.createUser(newUser);

    if(singup) {
      // Call to the service to login
      this._router.navigate([`/${RoutesName.dashboard}`]);
    }
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  redirectToLogin (): void {
    this._router.navigate([`/${RoutesName.login}`]);
  }

  getControl(controlName: string): FormControl{
    return this.singupForm.get(controlName) as FormControl;
  }

  printFormErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
  
      if (control?.errors) {
        console.log(`Error en el campo "${field}":`, control.errors);
      }
  
      if (control instanceof FormGroup) {
        this.printFormErrors(control); // Llama recursivamente para grupos anidados
      }
    });
  }
}
