import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonButton, IonToolbar, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonIcon, IonToolbar, IonButton, IonHeader]
})
export class HeaderComponent  implements OnInit {
  private _router: Router = inject(Router);

  constructor() { }

  ngOnInit() {}

  goToProfile() {
    //    console.log('goToProfile: ' + RoutesName.user);
        this._router.navigate(['user']);
  }

}
