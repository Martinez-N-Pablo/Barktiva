import { Component, OnInit } from '@angular/core';
import { IonContent, IonList } from "@ionic/angular/standalone";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [IonList, ]
})
export class UserProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
