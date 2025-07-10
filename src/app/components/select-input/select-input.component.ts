import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { IonText, IonLabel, IonAvatar, IonImg, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  standalone: true,
  imports: [
    IonText, 
    IonLabel,
    IonAvatar,
    IonImg,
    IonIcon,
  ]
})
export class SelectInputComponent  implements OnInit {
  @Input() optionSelected!: WritableSignal<any | null>;
  @Input() placeholderMessage: string = "";
  @Input() required: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/logo.png';
  }
}
