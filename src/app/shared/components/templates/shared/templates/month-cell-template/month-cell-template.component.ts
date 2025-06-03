import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-month-cell-template',
  templateUrl: './month-cell-template.component.html',
  styleUrls: ['./month-cell-template.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class MonthCellTemplateComponent {
  @ViewChild('monthCellTemplate', { static: true }) templateRef!: TemplateRef<any>;

  constructor() { }
}
