import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskInterface } from '@app/core/interfaces/task';
import { IonAvatar, IonImg, IonLabel, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  standalone: true,
  imports: [
    IonAvatar,
    IonImg,
    IonLabel,
    IonText,
    DatePipe
  ]
})
export class TaskComponent  implements OnInit {
  @Input()
    set taskSetter(value: TaskInterface) {
      if (value) {
        this.task = value;
        console.log(this.task);
      }
    }

  @Output() onTaskSelected: EventEmitter<string> = new EventEmitter<string>();
    
  task: TaskInterface | undefined = undefined;
  constructor() { }

  ngOnInit() {}

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/icon/logo.png';
  }

  taskSelected() {
    this.onTaskSelected.emit(this.task?._id || "");
  }
}
