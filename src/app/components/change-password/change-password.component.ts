import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { IonItem } from "@ionic/angular/standalone";
import { Subscription } from 'rxjs';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages } from '@app/core/const/magicStrings';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule
  ]
})
export class ChangePasswordComponent  implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  private _alertController: AlertController = inject(AlertController);

  emailForm!: FormGroup;
  passwordForm!: FormGroup;

  placeholderMessages: any = PlaceholderMessages;
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;

  emailFormSubmitted: boolean = false;
  passwordFormSubmitted: boolean = false;

  validEmail: boolean = false;

  constructor() { }

  ngOnInit() {
    this._initEmailForm();
    this._initPasswordForm();
    this._getUserData();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _getUserData(): void {}

  private _initEmailForm(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    });
  }

  private _initPasswordForm(): void {
    this.passwordForm = new FormGroup({
      newPassword: new FormGroup({}),
      confirmPassword: new FormGroup({})
    }, { validators: this.passwordsMatchValidator as ValidatorFn  });
  }

  getEmailControl(controlName: string): FormControl{
    return this.emailForm.get(controlName) as FormControl;
  }

  getPasswordControl(controlName: string): FormControl{
    return this.passwordForm.get(controlName) as FormControl;
  }

  submitEmail(): void {
    this.emailFormSubmitted = true;
    this.validEmail = true;
  }

  passwordsMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  async submitPassword() {
    // Acá validás primero tu formulario como siempre
    if (this.passwordForm.invalid || this.passwordForm.errors?.['passwordsMismatch']) {
      this.passwordFormSubmitted = true;
      return;
    }
  
    // Aquí iría tu lógica de envío...
    console.log('Contraseña actualizada');
  
    // Luego, mostrás el modal:
    const alert = await this._alertController.create({
      header: 'Éxito',
      message: 'Tu contraseña ha sido actualizada correctamente.',
      buttons: ['Aceptar'],
    });
  
    await alert.present();
  }}
