import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButton, IonImg, IonText, IonIcon, IonRadioGroup, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { ErrorMessages, ParagraphMessages, PlaceholderMessages, Titles } from '@app/core/magicStrings';
import { InputComponent } from '@app/shared/components/input/input.component';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { Dog } from '@app/core/interfaces/dog';
import { Subscription } from 'rxjs';
import { DogService } from '@app/core/services/dog.service';
import { DogFacadeService } from '@app/core/presenters/dog-facade.service';
import { SelectInputComponent } from "../../../shared/components/select-input/select-input.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
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
  ]
})
export class TaskPage implements OnInit {
  private _subscription: Subscription = new Subscription();
  title: string = Titles.task;

  private _formBuilder: FormBuilder = inject(FormBuilder);

  taskForm!: FormGroup;
  formSubmited: boolean = false;

  placeholderMessages = PlaceholderMessages;
  errorMessages = ErrorMessages;
  paragraphMessages = ParagraphMessages;

  dogsList: WritableSignal<Dog[]> = signal([]);
  dogSelected: WritableSignal<Dog | null> = signal(null);

  constructor(private _dogService: DogService, private _dogFacadeSerivce: DogFacadeService) {
    // this._dogFacadeSerivce(_dogService);
  }

  ngOnInit() {
    this._initForm();
    this._getPets();
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

  private _getPets(): void {
    // this._subscription.add(
    //   this._dogService.getBreeds().subscribe({
    //     next: (data: any) => {
    //       this.dogsList = data;
    //     },
    //     error: (error: any) => {},
    //     complete: () => {}
    //   })
    // );

    this.dogsList = this._dogFacadeSerivce.getBreeds();
  }
}
