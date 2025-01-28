import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonInput, IonHeader, IonTitle, IonToolbar, IonList, IonButton, IonItem, IonFooter } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogoComponent } from '@app/shared/components/logo/logo.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { InputComponent } from '@app/shared/components/input/input.component';
import { validateForm } from '@app/core/scripts/validate-forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
  standalone: true,
  imports: [IonFooter, 
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

  logoContainerWidth = '40%';

  private _subscriptions: Subscription[] = [];
  
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  title: string = Titles.singup;
  logoPath: string = RoutesName.path;
  formSubmited: boolean = false;
  
  singupForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this._initSingupForm();
  }

  // When the user leaves the view, clean the form errors
  ionViewWillLeave(): void {
    this.formSubmited = false;
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
  
  singup(): void {
    this.formSubmited = true;
    this.singupForm.markAllAsTouched();
    console.log(this.singupForm.errors);

    if (this.singupForm.invalid) {
      console.log('Formulario inválido');
      this.printFormErrors(this.singupForm);
      console.log(this.singupForm.errors);
      return;
    }

    // Check if the passwords are the same
    // if (!this.passwordsMatchValidator()) {
    //   this.singupForm.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
    //   console.log('Password do not Match');
    //   return;
    // }

    // Call to the service to login
    this._router.navigate([`/${RoutesName.petForm}`]);
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
