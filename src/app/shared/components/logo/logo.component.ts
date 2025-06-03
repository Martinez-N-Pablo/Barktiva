import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [IonImg, CommonModule]
})
export class LogoComponent  implements OnInit {
  private _router: Router = inject(Router);

  @Input() customStyles: { [key: string]: string } = {};
  @Input() logoPath: string = '';

  isClicked: boolean = false;

  constructor() { }

  ngOnInit() {}

  /*
    * Called when the user clicks on the logo
    * Apply click styles and call redirect function
    * @returns void
  */
  handleClick(): void {
    if (!this.isClicked) {
      this.isClicked = true;

      setTimeout(() => {
        this.isClicked = false;
        this.redirect(this.logoPath);
      }, 100);
    }
  }

  /*
    * Redirects the user to the home page
    * Takes into account if the user is authenticated
    * @returns void
  */
  redirect(path: string): void {
    this._router.navigate(['/' + path]);
  }
}
