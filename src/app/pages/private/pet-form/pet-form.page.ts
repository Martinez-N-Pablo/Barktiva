import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonThumbnail, IonToolbar, IonContent, IonHeader, IonButtons, IonIcon, IonTitle, IonList, IonItem, IonButton, IonImg } from '@ionic/angular/standalone';
import { LogoComponent } from "../../../components/logo/logo.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/const/magicStrings';
import { firstValueFrom, Subscription } from 'rxjs';
import { PetService } from '@app/core/services/pet.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { InputComponent } from '@app/components/input/input.component';
import { PhotoUploaderService } from '@app/core/services/photo-uploader.service';
import { SterilizedValue, Patterns, SexValue } from '@app/core/const/constValue';
import { ModalComponent } from '@app/components/modal/modal.component';
import { Breed } from '@app/core/interfaces/breed';
import { SelectInputComponent } from '@app/components/select-input/select-input.component';
import { InputRadioComponent } from "../../../components/input-radio/input-radio.component";
import { PetFacadeService } from '@app/core/presenters/pet-facade.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.page.html',
  styleUrls: ['./pet-form.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonButton,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    ButtonComponent,
    ReactiveFormsModule,
    InputComponent,
    IonThumbnail,
    ModalComponent,
    SelectInputComponent,
    InputRadioComponent,
    IonButtons,
    IonButton,
    IonIcon,
    IonToolbar,
  ]
})
export class PetFormPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _petFacadeService: PetFacadeService = inject(PetFacadeService);
  private _photoUploaderService: PhotoUploaderService = inject(PhotoUploaderService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _actionSheetController: ActionSheetController = inject(ActionSheetController); 

  previewImage: string = "";

  logoPath: string = RoutesName.dashboard || "";
  isClicked: boolean = false;

  sexValue = SexValue;
  SterilizedValue = SterilizedValue;
  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  
  title: string = Titles.petForm || "";
  
  formSubmited: boolean = false;

  breeds: any[] = [];
  breedSelected: WritableSignal<Breed | null> = signal(null);
  searchQuery: string = '';
  filteredBreeds = [...this.breeds]; // Opciones filtradas (inicialmente todas)

  photoFile!: File;

  sexInputValue: string = "";
  castratedInputValue: string = "";

  sexRadioOptions: {radioID: string, paragraphName: string}[] = [
    {radioID: this.sexValue.femenimo || "", paragraphName: this.placeholderMessages.female || ""},
    {radioID: this.sexValue.masculino || "", paragraphName: this.placeholderMessages.male || ""},
  ];

  sterilizedRadioOptions: {radioID: string, paragraphName: string}[] = [
    {radioID: this.SterilizedValue.intact || "", paragraphName: this.placeholderMessages.intact || ""},
    {radioID: this.SterilizedValue.sterilized || "", paragraphName: this.placeholderMessages.sterilized || ""},
  ];

  // Breed Modal ID
  breedSelectedModalID: string = "breedSelectedModalID";

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  
  petForm!: FormGroup;
  petId: string = "";

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
    this.petId = this._activatedRoute.snapshot.paramMap.get('id') || "";
  
    this._initPetForm();
    this._getPetsBreed();

    if(this.petId) {
      this._getPetData();
    }
  }

  ngOnDestroy(): void {
    if(this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private async _getPetData(): Promise<void> {
    const pet = await this._petFacadeService.getPetById(this.petId);

    if(pet) {
      this.petForm.patchValue(pet);

      this.sexInputValue = pet.sex || "";
      this.previewImage = pet.photo;
      this.castratedInputValue = pet.castrated || "";
      this.breedSelected.set(this.breeds.find(value => value.name === pet.breed) || "");
    }
  }

  ionViewWillLeave(): void {
    if(this._subscription) {
      this._subscription.unsubscribe();
    }

    this.formSubmited = false;
    Object.keys(this.petForm.controls).forEach((key) => {
      const control = this.petForm.get(key);
      control?.reset();
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  // Filtrar las opciones en tiempo real
  filterOptions(query: string) {
    this.searchQuery = query.toLowerCase();
    this.filteredBreeds = this.breeds.filter((breed) =>
      breed.label.toLowerCase().includes(this.searchQuery)
    );
  }

  // Detectar cambios en la selección
  onSelectChange(event: any): void {
    console.log('Seleccionado:', event.detail.value);
  }

  private _initPetForm(): void {
    this.petForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      breed: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      photo: new FormControl<File | null>(null),
      sex: new FormControl('', [Validators.minLength(1)]),
      age: new FormControl('0', [Validators.min(0), Validators.max(30), Validators.pattern(Patterns.integer)]),
      weight: new FormControl('0', [Validators.min(0)]),
      castrated: new FormControl(""),
    });

    this.petForm.get('breed')?.valueChanges.subscribe(data => {
    });
  }

  private async _getPetsBreed() {
    const breeds = await firstValueFrom(this._petFacadeService.getBreeds());

    if(breeds) {
      this.breeds = breeds;
      this.filteredBreeds = [...this.breeds];
    }
  }

  async onSubmit() {
    if(this.breedSelected()) {
      this.petForm.get("breed")?.setValue(this.breedSelected()!["name"] || "");
    }

    this.formSubmited = true;
    this.petForm.markAllAsTouched();

    if(this.petForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const res = (this.petId) ? await this._petFacadeService.updatePet(this.petId, this.petForm.value) : await this._petFacadeService.createPet(this.petForm.value);

    if(res) {
      this._navigateToDashboard();
    }
  }

  private _navigateToDashboard(): void {
    this._router.navigate(['dashboard']);
  }

  getControl(controlName: string): FormControl{
    return this.petForm.get(controlName) as FormControl;
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
      this.petForm.patchValue({ photo: file });
    }
  }

  sexSelected(value: string): void {
    this.sexInputValue = value || "";
    this.petForm.get('sex')?.setValue(this.sexInputValue);
  }

  castratedSelected(value: any): void {    
    this.castratedInputValue = value || "";
    this.petForm.get('castrated')?.setValue(this.castratedInputValue);
  }

  async deletePet() {
    const petDeleted = await this._petFacadeService.deletePet(this.petId);

    if(petDeleted) {
      this._navigateToDashboard();
    }
  }


  async presentOptionsModal() {
    const actionSheet = await this._actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Eliminar Mascota',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.deletePet()
        },
        {
          text: 'Ver Consejos',
          icon: 'book',
          handler: () => this._router.navigate(['/consejos'])
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    await actionSheet.present();
  }

  goBack(): void {
    this._navigateToDashboard();
  }
}
