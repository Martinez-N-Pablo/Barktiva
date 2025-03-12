import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonRadioGroup, IonLabel, IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  standalone: true,
  imports: [IonText, IonLabel, IonRadioGroup, 
    
  ],
})
export class InputRadioComponent  implements OnInit {
  @Input() paragraphMessage: string = '';
  @Input() radioGroupID: string = '';

  @Input() radioInputSelected: string = "";

  @Input() radioOptions: {radioID: string, paragraphName: string}[] = [];

  @Output() onRadioSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onSelect(radioSelectedValue: string): void {
    this.onRadioSelected.emit(radioSelectedValue);
  }

}
