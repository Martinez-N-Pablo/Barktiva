import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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

  breedsFiltered: any[] = [];

  placeholderMessage = PlaceholderMessages;
  debounceTime = 1000;

  searchControl = new FormControl('');
  
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

}
