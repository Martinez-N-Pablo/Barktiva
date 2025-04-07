import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceholderMessages } from '@app/core/magicStrings';
import { IonModal, IonDatetime, IonItem, IonLabel, IonDatetimeButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  imports: [FormsModule, IonDatetimeButton, IonLabel, IonItem, IonModal, IonDatetime],
})
export class InputDateComponent  implements OnInit {
  @Input() label: string = PlaceholderMessages.date || '';
  @Input() placeholder: string = PlaceholderMessages.dateFormat || "";
  @Input() id: string =  '';

  @Input() value?: string = '';

  constructor() { }

  ngOnInit() {}

}
