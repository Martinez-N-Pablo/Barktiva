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
        console.log("Tarea");
        console.log(value);
        this.task = {
          ...value,
          hourDosis: this._parseHour(value.hourDosis)
        };
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
  /**
   * 
   * @param hour: string | Date; hour to parse as format HH:MM
   * @returns 
   */
  private _parseHour(hour: string | Date): string {
    const auxTime = typeof hour === 'string' ? hour.split("T")[1] : hour;
    try {
      // Se parsea el string a tipo Date
      const date = typeof auxTime === 'string'
        ? new Date(`1970-01-01T${auxTime}`) 
        : new Date(auxTime);
      
      if (isNaN(date.getTime())) return ''; // Check if date is valid
      
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // return hour into format HH:MM
    } catch {
      return '';
    }
  }
}
