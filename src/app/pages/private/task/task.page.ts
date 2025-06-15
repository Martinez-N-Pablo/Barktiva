import { Component, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonSelect, IonSelectOption, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonImg, IonText, IonIcon, IonRadioGroup, IonLabel, IonAvatar, IonTextarea } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, Titles } from '@app/core/const/magicStrings';
import { InputComponent } from '@app/components/input/input.component';
import { ModalComponent } from '@app/components/modal/modal.component';
import { ButtonComponent } from '@app/components/button/button.component';
import { PetInterface } from '@app/core/interfaces/pet';
import { firstValueFrom, Subscription } from 'rxjs';
import { PetService } from '@app/core/services/pet.service';
import { PetFacadeService } from '@app/core/presenters/pet-facade.service';
import { SelectInputComponent } from "../../../components/select-input/select-input.component";
import { InputDateComponent } from '@app/components/input-date/input-date.component';
import { TaskService } from '@app/core/services/task.service';
import { DosesTimeOptions } from '@app/core/const/dosesTimeOptions';

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
    IonTitle,
    CommonModule,
    FormsModule,
    ModalComponent,
    SelectInputComponent,
    InputDateComponent,
    InputComponent,
    IonText,
    IonSelect,
    IonSelectOption,
  ]
})
export class TaskPage implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  title: string = Titles.task;

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _taskService: any = inject(TaskService);

  taskForm!: FormGroup;
  formSubmited: boolean = false;

  placeholderMessages = PlaceholderMessages;
  errorMessages = ErrorMessages;
  paragraphMessages = ParagraphMessages;

  dosesTimeOptions: any[] = DosesTimeOptions;

  petsList: WritableSignal<PetInterface[]> = signal([]);
  petSelected: WritableSignal<PetInterface | null> = signal(null);

  taskTylesList: WritableSignal<any[]> = signal([]);
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

  startDateValue: WritableSignal<string> = signal('');
  endDateValue: WritableSignal<string> = signal('');

  petSelectModalId: string = 'petSelectModalId';
  taskTypeSelectModalId: string = 'taskTypeSelectModalId';

  notificationState: boolean = false;

  constructor(
    private _petFacadeSerivce: PetFacadeService) {
  }

  ngOnInit() {
    this._initForm();
    this._getPets();
    this._getTaskTypes();    
  }

  ngOnDestroy(): void {
    if(this._subscription) {
      this._subscription.unsubscribe();
    }

    this.notificationState = false;
  }

  private _initForm(): void {
    this.taskForm = this._formBuilder.group({
      petId: new FormControl('', [Validators.required]),
      taskType: new FormControl('', [Validators.required]),
      dose: new FormControl('', [Validators.required]),
      dosePerDay: new FormControl('', [Validators.required]),
      dosePerWeek: new FormControl('', [Validators.required]),
      dosePerMonth: new FormControl('', [Validators.required]),

      notification: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      totalTime: new FormControl('', [Validators.required]),
      routeAdministration: new FormControl('', [Validators.required]),
      initialDate: new FormControl('', [Validators.required]),
      finalDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.taskForm.get('dose')?.valueChanges.subscribe(value => {
      // console.log('Nuevo valor de dose:', value);
      // console.log(this.dosesTimeOptions[2].id);
    });
  }

  private _getTaskTypes(): void {
    this._subscription.add(
      this._taskService.getTasks().subscribe({
        next: (data: any) => {
          this.taskTylesList.set(data);
        },
        error: (error: any) => {},
        complete: () => {}
      })
    );
  }
  onSubmit(): void {}

  getControl(controlName: string): FormControl{
    return this.taskForm.get(controlName) as FormControl;
  }

  private async _getPets() {
    const pets = await firstValueFrom(this._petFacadeSerivce.getBreeds());

    if (pets) {
      this.petsList.set(pets);
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
}
