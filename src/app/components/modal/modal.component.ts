import { Component, input, Input, InputSignal, OnInit, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderMessages } from '@app/core/const/magicStrings';
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
  @Input() optionsList: any[] = [];
  @Input() optionSelected!: WritableSignal<any | null>;
  @Input() modalID: string = '';

  optionsFiltered: any[] = [];

  placeholderMessage = PlaceholderMessages;
  debounceTime = 1000;

  searchControl = new FormControl('');

  @ViewChild('modal', { static: true }) modal!: IonModal;

  constructor() { }

  ngOnInit() {
    this.optionsFiltered = this.optionsList;
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.filteroption(searchTerm);
    });
  }

  filteroption(searchTerm: string | null): void {
    if (!searchTerm?.trim()) {
      this.optionsFiltered = [...this.optionsList];
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    this.optionsFiltered = this.optionsList.filter( (option: any) =>
      option.name.toLowerCase().includes(searchLower)
    );
  }

  // When the user select a option, it is send to the father component
  onSelectOption(option: any): void {
    if(option) {
      this.optionSelected.set(option);
      this.modal.dismiss();
    }
  }
}
