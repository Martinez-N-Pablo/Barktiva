import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg, IonThumbnail } from '@ionic/angular/standalone';
import { RoutesName } from '@app/core/const/magicStrings';
import { ScheludeComponent } from '@app/components/schelude/schelude.component';
import { Router } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { PetInterface } from '@app/core/interfaces/pet';
import { PetFacadeService } from '@app/core/presenters/pet-facade.service';
import { TaskFacadeService } from '@app/core/presenters/task-facade.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonImg,
    IonLabel,
    ScheludeComponent, 
    IonContent, 
    CommonModule, 
    FormsModule,
    IonThumbnail,
    HeaderComponent,
  ]
})
export class DashboardPage implements OnInit {
  logoPath: string = RoutesName.login;

  petsList: PetInterface[] = [];

  petTitle: string = "Perros";
  taskTitle: string = "Tareas";

  private _router: Router = inject(Router);
  private _petFacadeService: PetFacadeService = inject(PetFacadeService);
  private _taskFacadeService: TaskFacadeService = inject(TaskFacadeService);
  constructor() { }

  ngOnInit() {
    this._getPets();
  }

  private async _getPets() {
    const pets = await this._petFacadeService.getAllPets();

    if(pets) {
      this.petsList = pets.pets || [];
    }
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/logo.png';
  }

  sendToPetPage(petId?: string): void {
    if (petId) {
      this._router.navigate(['/pet-form', petId]);
    } else {
      this._router.navigate(['/pet-form']);
    }
  }
}
