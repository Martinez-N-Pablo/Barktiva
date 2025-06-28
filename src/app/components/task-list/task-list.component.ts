import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { TaskInterface } from '@app/core/interfaces/task';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [
    TaskComponent
  ]
})
export class TaskListComponent  implements OnInit {
  @Input()
    set taskListSetter(value: TaskInterface[]) {
      if (value) {
        this.taskList = value;
      }
    }
  @Output() onTaskSelected: EventEmitter<string> = new EventEmitter<string>();
  taskList: TaskInterface[] = [];

  constructor() { }

  ngOnInit() {
  }

  taskSelected(event: any) {
    this.onTaskSelected.emit(event);
  }
}
