import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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

  @Input() isDashboard: boolean = true;
  @Input() title: string = "";

  @Output() onBackButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  goToProfile() {
    this._router.navigate(['user']);
  }

  goBack(): void {
    setTimeout(() => {
      this.onBackButtonClicked.emit();
    }, 100);
  }
}
