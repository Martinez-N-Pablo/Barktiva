import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonSelect, IonSelectOption,IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSearchbar, IonActionSheet, IonButton } from '@ionic/angular/standalone';
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { SecondaryButtonComponent } from "../../../shared/components/secondary-button/secondary-button.component";
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, RoutesName, Titles } from '@app/core/magicStrings';
import { Subscription } from 'rxjs';
import { PetService } from '@app/core/services/pet.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.page.html',
  styleUrls: ['./pet-form.page.scss'],
  standalone: true,
  imports: [IonButton, IonActionSheet, IonSearchbar, IonItem, 
    IonList, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    LogoComponent, 
    SecondaryButtonComponent,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption
  ]
})
export class PetFormPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _petService: PetService = inject(PetService);

  logoPath: string = RoutesName.dashboard || "";

  errorMessages: any = ErrorMessages;
  paragraphMessages: any = ParagraphMessages;
  placeholderMessages: any = PlaceholderMessages;
  
  title: string = Titles.petForm || "";

  breeds: any[] = [];
  breedSelected: any;
  searchQuery: string = '';
  filteredBreeds = [...this.breeds]; // Opciones filtradas (inicialmente todas)

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

  // Método para abrir el select con buscador personalizado
  async onOpenSelect() {
    const alert = await this.alertCtrl.create({
      header: 'Selecciona una opción',
      inputs: [
        {
          name: 'search',
          type: 'text',
          placeholder: 'Buscar...',
          value: this.searchQuery,
          handler: (event: any) => {
            this.filterOptions(event.target.value);
          },
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log('Seleccionado:', data);
          },
        },
      ],
      message: this.getOptionsMarkup(), // Incrusta las opciones filtradas
    });

    await alert.present();
  }

  // Filtrar las opciones en tiempo real
  filterOptions(query: string) {
    this.searchQuery = query.toLowerCase();
    this.filteredBreeds = this.breeds.filter((breed) =>
      breed.label.toLowerCase().includes(this.searchQuery)
    );
  }

  // Generar dinámicamente las opciones para mostrarlas en el modal
  getOptionsMarkup(): string {
    return this.filteredBreeds
      .map((option) => `<div>${option.label}</div>`)
      .join('');
  }

  // Detectar cambios en la selección
  onSelectChange(event: any): void {
    console.log('Seleccionado:', event.detail.value);
  }

  private _initPetForm(): void {
    this.petForm = this._formBuilder.group({
      breed: new FormControl(null, [Validators.required, Validators.email]),
      photo: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      sex: new FormControl('', [Validators.required, Validators.minLength(6)]),
      age: new FormControl('', [Validators.required, Validators.minLength(6)]),
      weight: new FormControl('', [Validators.required, Validators.minLength(6)]),
      castrated: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

  onSubmit(): void {}

}
