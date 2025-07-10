import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IonThumbnail, IonList, IonItem, IonButton, IonImg } from "@ionic/angular/standalone";
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages } from '@app/core/const/magicStrings';
import { PhotoUploaderService } from '@app/core/services/photo-uploader.service';
import { InputDateComponent } from '../input-date/input-date.component';
import { UserFacadeService } from '@app/core/presenters/user-facade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonButton, 
    IonItem, 
    IonList, 
    ButtonComponent,
    InputComponent,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    IonThumbnail,
    InputDateComponent
  ]
})
export class UserProfileComponent  implements OnInit {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _photoUploaderService: PhotoUploaderService = inject(PhotoUploaderService);
  private _userFacadeService: UserFacadeService = inject(UserFacadeService);
  private _router: Router = inject(Router);

  userProfileForm!: FormGroup;
  formSubmitted: boolean = false;

  placeholderMessages: any = PlaceholderMessages;
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;

  previewImage: string = '';
  photoIsClicked: boolean = false;

  //Birhdate
  birthdate: any = {
    label: this.placeholderMessages.birthdate || "",
    placeholder: this.placeholderMessages.dateFormat || "",
    idValue: 'birthdate',
    required: false,
  };
  birthdateValue: string = new Date().toISOString();

  formSubmited: boolean = false;

  constructor() { }

  ngOnInit() {
    this._initForm();
    this._getUserData();
  }

  private _initForm(): void {
    const today: string = new Date().toISOString().split('T')[0] as string;

    this.userProfileForm = this._formBuilder.group({
      photo: new FormControl<File | null>(null),
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', []],
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl(today, []),
    });

    console.log('surname validators:', this.userProfileForm.get('surname')?.validator);

  }

  private async _getUserData(): Promise<void> {
    const userData = await this._userFacadeService.getUserData();
    
    if(userData) {
      this.userProfileForm.patchValue(userData);

      this.previewImage = userData?.photo || "";
      if(userData.birthdate) {
        this.birthdateValue = userData.birthdate;
      }
    }

    // Error de required en surname
    const surnameCtrl = this.userProfileForm.get('surname');
    if (surnameCtrl) {
      surnameCtrl.clearValidators();  // Quita todo
      surnameCtrl.setValidators([]); // Asegura nulo
      surnameCtrl.updateValueAndValidity();
    }
  }

  updateUserProfileData(): void {}

  getControl(controlName: string): FormControl{
    return this.userProfileForm.get(controlName) as FormControl;
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

  async onSelectImage() {
    const file = await this._photoUploaderService.selectImage(); // ahora devuelve un File

    if (file) {
      // Previsualización
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Insertar el archivo en el formulario (¡no como string!)
      this.userProfileForm.patchValue({ photo: file });
    }
  }

  onBirthdateChange(newDate: string): void {
    const formatDatte = newDate.split('T')[0]; // Format the date to DD-MM-YYYY, whitout time
    this.userProfileForm.get('birthdate')?.setValue(formatDatte);
  }

  onSubmit(): void {
    this.formSubmited = true;
    this.userProfileForm.markAllAsTouched();

    if(this.userProfileForm.invalid) {
      this.printFormErrors(this.userProfileForm);
      console.log("Formulario inválido");
      return;
    }

    const res = this._userFacadeService.updateUser(this.userProfileForm.value);

    this._navigateToDashboard();
  }

  private _navigateToDashboard(): void {
    this._router.navigate(['dashboard']);
  }
}
