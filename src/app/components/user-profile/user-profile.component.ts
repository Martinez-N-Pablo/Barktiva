import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IonThumbnail, IonList, IonItem, IonButton, IonImg } from "@ionic/angular/standalone";
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages } from '@app/core/const/magicStrings';
import { PhotoUploaderService } from '@app/core/services/photo-uploader.service';
import { InputDateComponent } from '../input-date/input-date.component';

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


  userProfileForm!: FormGroup;
  formSubmitted: boolean = false;

  placeholderMessages: any = PlaceholderMessages;
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;

  previewImage: string = '';
  photoIsClicked: boolean = false;

  //Birhdate
  birthdateValue: WritableSignal<string> = signal('');
  birthdate: any = {
    label: 'Fecha de nacimiento',
    placeholder: 'dd/MM/yyyy',
    idValue: 'birthdate',
    required: false,
  };

  constructor() { }

  ngOnInit() {
    this._initForm();
    this._getUserData();
  }

  private _initForm(): void {
    this.userProfileForm = this._formBuilder.group({
      photo: new FormControl(''),
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', []],
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl('', [Validators.required]),
    });
  }

  private _getUserData(): void {}

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
    const imageBase64 = await this._photoUploaderService.selectImage();
    if (imageBase64) {
      this.previewImage = imageBase64; // Actualizamos la vista previa
      this.userProfileForm.patchValue({ photo: imageBase64 }); // Insertamos la imagen al formulario
    }
  }

  onBirthdateChange(newDate: string): void {
    const formatDatte = newDate.split('T')[0]; // Format the date to DD-MM-YYYY, whitout time
    this.userProfileForm.get('birhdate')?.setValue(formatDatte);
  }

  submit(): void {}
}
