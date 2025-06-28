import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IonButton, Platform, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, IonIcon]
})
export class ButtonComponent  implements OnInit {
  @Input()
  buttonContent: string = "";
  @Input()
  class: string = "";
  @Input()
  type: string = "";
  @Input()
  form?: string = "";
  @Input()
  role: string = "";
  @Input()
  icon: string = "";

  @Output()
  onButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  private _platform: Platform = inject(Platform);

  isClicked: boolean = false;
  isAndroid: boolean = false; // Clase adiciona a aplicar al boton en base al SO

  constructor() {
    // Se comprueba que SO ejecuta la app y se inserta nueva clase si es Android
    this._platform.ready().then(() => {
      this.isAndroid = this._platform.is('android');
    });

  }

  ngOnInit() {}

  onClick(): void {
    if (!this.isClicked) {
      this.isClicked = true;

      setTimeout(() => {
        this.isClicked = false
        this.onButtonClicked.emit();
      }, 100);
    }
  }

}
