import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PlaceholderMessages } from '@app/core/const/magicStrings';
import { IonDatetime, IonDatetimeButton, IonLabel, IonModal } from '@ionic/angular/standalone';

@Component({
  selector: 'app-input-hour',
  templateUrl: './input-hour.component.html',
  styleUrls: ['./input-hour.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonDatetimeButton,
    IonDatetime,
    IonModal
  ]
})
export class InputHourComponent  implements OnInit {
  @Input() label: string = PlaceholderMessages.hour || '';
  @Input() placeholder: string = PlaceholderMessages.hourFormat || "";
  @Input() idValue: string =  '';
  @Input() required: boolean = false;
  @Input() value?: string = '';

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('hourModal', { static: false }) hourModal!: IonModal;

  constructor() { }

  ngOnInit() {}
  
  onChange(event: any) {
    const newDate = event.detail?.value || "";
    this.valueChange.emit(newDate);

    this.hourModal.dismiss();
  }
}
