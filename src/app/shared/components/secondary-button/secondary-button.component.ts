import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule]
})
export class SecondaryButtonComponent  implements OnInit {
  @Input()
  buttonContent: string = "";
  @Input()
  class: string = "";
  @Input()
  type: string = "";
  @Input()
  form: string = "";

  @Output()
  onButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  isClicked: boolean = false;

  constructor() { }

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
