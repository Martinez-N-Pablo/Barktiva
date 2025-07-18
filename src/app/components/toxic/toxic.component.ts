import { Component, Input, OnInit } from '@angular/core';
import { ToxicInterface } from '@app/core/interfaces/toxic';
import { IonText, IonAvatar, IonImg, IonLabel  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-toxic',
  templateUrl: './toxic.component.html',
  styleUrls: ['./toxic.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonImg,
    IonLabel,
    IonText
  ]
})
export class ToxicComponent implements OnInit {
   @Input()
      set toxicSetter(value: ToxicInterface) {
        if (value) {
          console.log("toxico");
          console.log(value);
          this.toxic = {
            ...value,
          };
        }
      };

  toxic: ToxicInterface | undefined = undefined;

  constructor() {
    console.log("Hola");
  }

  ngOnInit() {}

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/logo.png';
  }

}
