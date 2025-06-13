import { Component, Input, OnInit, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  implements OnInit {
  @Input() task!: WritableSignal<any | null>;

  constructor() { }

  ngOnInit() {}

}
