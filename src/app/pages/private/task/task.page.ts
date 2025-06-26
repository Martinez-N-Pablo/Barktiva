import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonButtons, IonSelect, IonSelectOption, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonText, IonIcon, IonTextarea, ActionSheetController } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, Titles } from '@app/core/const/magicStrings';
import { InputComponent } from '@app/components/input/input.component';
import { ModalComponent } from '@app/components/modal/modal.component';
import { ButtonComponent } from '@app/components/button/button.component';
import { PetInterface } from '@app/core/interfaces/pet';
import { Subscription } from 'rxjs';
import { PetFacadeService } from '@app/core/presenters/pet-facade.service';
import { SelectInputComponent } from "../../../components/select-input/select-input.component";
import { InputDateComponent } from '@app/components/input-date/input-date.component';
import { DosesTimeOptions } from '@app/core/const/dosesTimeOptions';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFacadeService } from '@app/core/presenters/task-facade.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    IonTextarea, 
    ButtonComponent,
    ReactiveFormsModule,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    CommonModule,
    FormsModule,
    ModalComponent,
    SelectInputComponent,
    InputDateComponent,
    InputComponent,
    IonText,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonIcon,
    IonButtons,
    IonButton,
  ]
})
export class TaskPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  title: string = Titles.task || "";

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);
  private _actionSheetController: ActionSheetController = inject(ActionSheetController);
  private _taskFacadeService: TaskFacadeService = inject(TaskFacadeService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  taskForm!: FormGroup;
  formSubmited: boolean = false;

  placeholderMessages = PlaceholderMessages;
  errorMessages = ErrorMessages;
  paragraphMessages = ParagraphMessages;

  dosesTimeOptions: any[] = DosesTimeOptions;

  petsList: WritableSignal<PetInterface[]> = signal([]);
  petSelected: WritableSignal<PetInterface | null> = signal(null);

  taskTypesList: WritableSignal<any[]> = signal([]);
  taskTypeSelected: WritableSignal<any | null> = signal(null);

  startDate: any = {
    label: this.placeholderMessages.dateStart,
    placeholder: this.placeholderMessages.dateFormat,
    id: 'startDate',
    required: true,
  };

  endDate: any = {
    label: this.placeholderMessages.dateEnd,
    placeholder: this.placeholderMessages.dateFormat,
    id: 'endDate',
    required: true,
  };

  startDateValue: string = new Date().toISOString();
  finalDateValue: string = new Date().toISOString();

  petSelectModalId: string = 'petSelectModalId';
  taskTypeSelectModalId: string = 'taskTypeSelectModalId';

  notificationState: boolean = false;

  taskId: string = "";

  constructor(
    private _petFacadeService: PetFacadeService) {
  }

  ngOnInit() {
    this.taskId = this._activatedRoute.snapshot.paramMap.get('id') || "";
    
    this._initForm();
    this._getPets();
    this._getTaskTypes();

    if(this.taskId) {
      this.getTaskData();
    }
  }

  ngOnDestroy(): void {
    if(this._subscription) {
      this._subscription.unsubscribe();
    }

    this.notificationState = false;
  }

  private _initForm(): void {
    const today: string = new Date().toISOString().split('T')[0] as string;

    this.taskForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      pets: this._formBuilder.array([''], [Validators.required]),
      taskType: new FormControl('', [Validators.required]),
      dosesTime: new FormControl(''), // dia semana o mes
      dosePerDay: new FormControl(''),
      dosePerWeek: new FormControl(''),
      dosePerMonth: new FormControl(''),

      notification: new FormControl(''),
      quantity: new FormControl(''),
      totalTime: new FormControl(''),
      routeAdministration: new FormControl(''),
      initialDate: new FormControl(today, [Validators.required]),
      finalDate: new FormControl(today, [Validators.required]),
      description: new FormControl('',),
    });
    this.taskForm.get('dose')?.valueChanges.subscribe(value => {
      // console.log('Nuevo valor de dose:', value);
      // console.log(this.dosesTimeOptions[2].id);
    });
  }

  get petsArray(): FormArray {
    return this.taskForm.get('pets') as FormArray;
  }

  get initialDate(): FormControl {
    return this.taskForm.get("initialDate") as FormControl;
  }

  get finalDate(): FormControl {
    return this.taskForm.get("finalDate") as FormControl;
  }

  private async _getTaskTypes(): Promise<void> {
    const taskTypes = await this._taskFacadeService.getAllTaskTypes();

    if(taskTypes) {
      this.taskTypesList.set(taskTypes || []);
    }
  }

  private async getTaskData(): Promise<any> {
    const task = await this._taskFacadeService.getTaskById(this.taskId);

    if(task) {
      this.taskForm.patchValue(task);

      if(task.pets && task.pets.length > 0) {
        this.petSelected.set(task.pets[0] || "");
      }

      this.taskTypeSelected.set(task.taskType || "");
      this.notificationState = task.notification || false;

      if(task.initialDate) {
        this.startDateValue = task.initialDate;
      }

      if(task.finalDate) {
        this.finalDateValue = task.finalDate;
      }
      
      this.finalDateValue = task.initialDate || "";
      this.finalDateValue = task.finalDate || "";
    }
  }

  async onSubmit(): Promise<void> {
    // Setear correctamente FormArray campos
    const petsFormArray = this.taskForm.get('pets') as FormArray;
    petsFormArray.clear(); // se limpia el valor anterior

    const selectedPetId = this.petSelected()?._id;
    const selectedTaskTypeId = this.taskTypeSelected()?._id;

    if (selectedPetId && selectedTaskTypeId) {
      petsFormArray.push(new FormControl(selectedPetId));
      this.taskForm.get("taskType")?.setValue(selectedTaskTypeId);
    }

    this.formSubmited = true;
    this.taskForm.markAllAsTouched();

    if (this.taskForm.invalid) {
      console.log("Formulario incorrecto");
      this._logFormErrors(this.taskForm);
      return;
    }

    const res = (this.taskId) 
      ? await this._taskFacadeService.updateTask(this.taskId, this.taskForm.value) 
      : await this._taskFacadeService.createTask(this.taskForm.value);

    if(res) {
      this._navigateToDashboard();
    }
  }

  private _logFormErrors(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control && control.invalid) {
        console.warn(`Campo inválido: "${key}"`, control.errors);
      }
    });
  }

  getControl(controlName: string): FormControl{
    return this.taskForm.get(controlName) as FormControl;
  }

  private async _getPets() {
    const pets = await this._petFacadeService.getAllPets();
    
    if(pets) {
      this.petsList.set(pets.pets || []);
    }
  }

  onStartDateChange(newDate: string): void {
    const formatDatte = newDate.split('T')[0]; // Format the date to DD-MM-YYYY, whitout time
    this.taskForm.get('initialDate')?.setValue(formatDatte);
  }

  onEndDateChange(newDate: any): void {
    const formatDatte = newDate.split('T')[0]; // Format the date to DD-MM-YYYY, whitout time
    this.taskForm.get('finalDate')?.setValue(formatDatte);
  }

  onChangeNotificationsState(): void {
    this.notificationState = !this.notificationState
    this.taskForm.get('notification')?.setValue(this.notificationState);
  }

  async deleteTask(taskId?: string) {
    const id = (taskId) ? taskId : (this.taskId) ? this.taskId : "";
    const taskDeleted = await this._taskFacadeService.deleteTask(id);

    if(taskDeleted) {
      this._navigateToDashboard();
    }
  }

  private _navigateToDashboard(): void {
    this._router.navigate(['dashboard']);
  }

  async presentOptionsModal() {
    const actionSheet = await this._actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Eliminar Tarea',
          role: 'destructive',
          icon: 'trash',
          handler: () => this.deleteTask()
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    await actionSheet.present();
  }
  
  goBack(): void {
    this._router.navigate(['/dashboard']);
  }
}
