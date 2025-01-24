import { Component, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonLabel, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonTabButton, IonTabBar, IonTabs, ]
})
export class TabsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
