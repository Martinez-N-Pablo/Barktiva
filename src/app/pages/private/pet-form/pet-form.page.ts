import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonThumbnail, IonContent, IonSelect, IonSelectOption,IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSearchbar, IonActionSheet, IonButton, IonFooter, IonImg } from '@ionic/angular/standalone';
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Subscription } from 'rxjs';
import { PetService } from '@app/core/services/pet.service';
import { AlertController } from '@ionic/angular';
import { InputComponent } from '@app/shared/components/input/input.component';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.page.html',
  styleUrls: ['./pet-form.page.scss'],
  standalone: true,
  imports: [IonImg, 
    IonButton, 
    IonActionSheet, 
    IonSearchbar, 
    IonItem, 
    IonList, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    CommonModule, 
    FormsModule, 
    ButtonComponent,
    ReactiveFormsModule,
    InputComponent,
    IonThumbnail,
  ]
})
export class PetFormPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _petService: PetService = inject(PetService);

  logoPath: string = RoutesName.dashboard || "";
  isClicked: boolean = false;

  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  
  title: string = Titles.petForm || "";
  
  formSubmited: boolean = false;

  breeds: any[] = [];
  breedSelected: any;
  searchQuery: string = '';
  filteredBreeds = [...this.breeds]; // Opciones filtradas (inicialmente todas)

  photoFile!: File;

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

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
    this._initPetForm();
    this._getPetsBreed();
  }

  ngOnDestroy(): void {
    if(this._subscription) {
      this._subscription.unsubscribe();
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
      photo: new FormControl(''),
      sex: new FormControl('', [Validators.minLength(1)]),
      age: new FormControl(0, [Validators.min(0), Validators.max(30)]),
      weight: new FormControl('', [Validators.min(0)]),
      castrated: new FormControl(false),
    });

    this.petForm.get('breed')?.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  private _getPetsBreed(): void {
    this._subscription.add(
      this._petService.getBreeds().subscribe({
        next: (data: any) => {
          this.breeds = data;
          this.filteredBreeds = [...this.breeds];
          console.log(this.breeds);
        },
        error: (error: any) => {},
        complete: () => {}
      })
    );
  }

  onSubmit(): void {
    this.formSubmited = true;
  }

  getControl(controlName: string): FormControl{
    return this.petForm.get(controlName) as FormControl;
  }
}
