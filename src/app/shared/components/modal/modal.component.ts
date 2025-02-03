import { Component, Input, OnInit } from '@angular/core';
import { IonModal, IonAvatar, IonSearchbar, IonContent, IonList, IonItem, IonImg, IonLabel, IonText } from "@ionic/angular/standalone";

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
    IonModal
  ],
})
export class ModalComponent  implements OnInit {
  @Input() breedList: any;
  
  constructor() { }

  ngOnInit() {}

}
