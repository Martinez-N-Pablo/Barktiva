import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonImg, IonText, IonIcon, IonRadioGroup } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, Titles } from '@app/core/magicStrings';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    IonIcon,
    IonText,
    InputComponent,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    CommonModule,
    FormsModule
  ]
})
export class TaskPage implements OnInit {
  title: string = Titles.task;

  private _formBuilder: FormBuilder = inject(FormBuilder);

  taskForm!: FormGroup;
  formSubmited: boolean = false;

  placeholderMessages = PlaceholderMessages;
  errorMessages = ErrorMessages;
  paragraphMessages = ParagraphMessages;

  constructor() { }

  ngOnInit() {
    this._initForm();
  }

  private _initForm(): void {
    this.taskForm = this._formBuilder.group({
      petId: new FormControl('', [Validators.required]),
      taskType: new FormControl('', [Validators.required]),
      dose: new FormControl('', [Validators.required]),
      dosePerWeek: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      totalTime: new FormControl('', [Validators.required]),
      routeAdministration: new FormControl('', [Validators.required]),
      initialDate: new FormControl('', [Validators.required]),
      finalDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {}

  getControl(controlName: string): FormControl{
    return this.taskForm.get(controlName) as FormControl;
  }
}
