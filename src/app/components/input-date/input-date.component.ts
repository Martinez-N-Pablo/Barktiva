import { Component, EventEmitter, OnInit, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceholderMessages } from '@app/core/const/magicStrings';
import { IonModal, IonDatetime, IonItem, IonLabel, IonDatetimeButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  imports: [FormsModule, IonDatetimeButton, IonLabel, IonModal, IonDatetime],
})
export class InputDateComponent  implements OnInit {
  @Input() label: string = PlaceholderMessages.date || '';
  @Input() placeholder: string = PlaceholderMessages.dateFormat || "";
  @Input() idValue: string =  '';
  @Input() required: boolean = false;

  @Input() value?: string = '';

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('dateModal', { static: false }) dateModal!: IonModal;

  constructor() { }

  ngOnInit() {
    console.log("Dentro del componente")
    console.log(this.value);
  }

  /**
   * 
   * @param event 
   */
  onChange(event: CustomEvent): void {
    const newDate = event.detail?.value || "";
    this.valueChange.emit(newDate);

    this.dateModal.dismiss();
  }
}
