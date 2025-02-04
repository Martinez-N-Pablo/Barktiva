import { Component, input, Input, InputSignal, OnInit, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Breed } from '@app/core/interfaces/breed';
import { PlaceholderMessages } from '@app/core/magicStrings';
import { IonModal, IonAvatar, IonSearchbar, IonContent, IonList, IonItem, IonImg, IonLabel, IonText } from "@ionic/angular/standalone";
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonText, 
    IonLabel,
    IonImg, 
    IonItem, 
    IonList, 
    IonContent, 
    IonSearchbar, 
    IonAvatar, 
    IonModal,
    ReactiveFormsModule,
  ],
})
export class ModalComponent  implements OnInit {
  @Input() breedsList: any;
  @Input() breedSelected!: WritableSignal<Breed | null>;

  breedsFiltered: any[] = [];

  placeholderMessage = PlaceholderMessages;
  debounceTime = 1000;

  searchControl = new FormControl('');

  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor() { }

  ngOnInit() {
    this.breedsFiltered = this.breedsList;
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.filterBreeds(searchTerm);
    });
  }

  filterBreeds(searchTerm: string | null): void {
    if (!searchTerm?.trim()) {
      this.breedsFiltered = [...this.breedsList];
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    this.breedsFiltered = this.breedsList.filter( (breed: any) =>
      breed.name.toLowerCase().includes(searchLower)
    );
  }

  // When the user select a breed, it is send to the father component
  onSelectBreed(breed: any): void {
    if(breed) {
      this.breedSelected.set(breed);
      this.modal.dismiss();
    }
  }

}
