import { Component, inject, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonImg, IonThumbnail, IonText } from '@ionic/angular/standalone';
import { RoutesName } from '@app/core/const/magicStrings';
import { ScheludeComponent } from '@app/components/schelude/schelude.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { PetInterface } from '@app/core/interfaces/pet';
import { PetFacadeService } from '@app/core/presenters/pet-facade.service';
import { TaskFacadeService } from '@app/core/presenters/task-facade.service';
import { TaskInterface } from '@app/core/interfaces/task';
import { Subscription } from 'rxjs';
import { TaskListComponent } from '@app/components/task-list/task-list.component';
import { ButtonComponent } from '@app/components/button/button.component';

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
    TaskListComponent,
    IonText,
    ButtonComponent
  ]
})
export class DashboardPage implements OnInit {
  title: string = "Barktiva";
  logoPath: string = RoutesName.login;

  petsList: PetInterface[] = [];
  taskList: TaskInterface[] = [];
  taskListOnDateSelected: TaskInterface[] = [];

  petTitle: string = "Perros";
  taskTitle: string = "Tareas";
  subTaskDaySelectedTitle: string = "Tareas para hoy";

  private _router: Router = inject(Router);
  private _activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private _petFacadeService: PetFacadeService = inject(PetFacadeService);
  private _taskFacadeService: TaskFacadeService = inject(TaskFacadeService);

  constructor() { }

  ngOnInit() {
    this._activeRoute.queryParams.subscribe((params) => {
      this._getPets();
      this._getTasks();

      // Si por url llega el parametro reload, lo eliminamos, solo se utiliza para recargar la pagina
      if (params['reload']) {
        this._router.navigate([], {
          queryParams: {},
          replaceUrl: true,
          queryParamsHandling: ''
        });
      }
    });
  }

  private async _getPets() {
    const pets = await this._petFacadeService.getAllPets();

    if(pets) {
      this.petsList = pets.pets || [];
    }
  }

  private async _getTasks() {
    const tasks = await this._taskFacadeService.getAllTask();

    if(tasks) {
      this.taskList = tasks?.tasks || [];

      const today = new Date();

      this.taskListOnDateSelected = this.taskList.filter(task => {
        const start = new Date(task.initialDate);
        const end = new Date(task.finalDate);

        // Comparar solo fechas sin horas
        const sameOrBefore = start <= today;
        const sameOrAfter = end >= today;

        return sameOrBefore && sameOrAfter;
      });
    }
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/logo.png';
  }

  sendToPetPage(petId?: string): void {
    if (petId) {
      this._router.navigate([`/${RoutesName.petForm}`, petId]);
    } else {
      this._router.navigate([`/${RoutesName.petForm}`]);
    }
  }

  sendToTaskPage(taskId?: string) {
    if(taskId) {
      this._router.navigate([`/${RoutesName.task}`, taskId]);
    }
    else {
      this._router.navigate([`/${RoutesName.task}`]);
    }
  }

  // Cuando la fecha seleccionada cambia, se filtra las tareas para obtener las que conincidan con la fecha seleccionada
  onSelectedDateChange(date: Date) {
    this.taskListOnDateSelected = this.taskList.filter(task => {
      const start = new Date(task.initialDate);
      const end = new Date(task.finalDate);
      return date >= start && date <= end;
    });
  }
}
