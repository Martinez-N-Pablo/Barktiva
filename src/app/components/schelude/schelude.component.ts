// #region Imports
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMonths,
  addWeeks,
  subMonths,
  subWeeks,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DAYS_OF_WEEK, EventColor } from 'calendar-utils';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlatPickrModuleModule } from '@app/core/modules/flat-pickr-module.module';
import { CalendarModuleModule } from '@app/core/modules/calendar-module.module';
import { HammerModule } from '@angular/platform-browser';
import { trigger, keyframes, animate, transition, style } from '@angular/animations';
import { MonthCellTemplateComponent } from '../templates/shared/templates/month-cell-template/month-cell-template.component';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TaskInterface } from '@app/core/interfaces/task';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-schelude',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schelude.component.scss'],
  templateUrl: './schelude.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatPickrModuleModule,
    CalendarModuleModule,
    HammerModule,
    MonthCellTemplateComponent,
    IonSelect,
    IonSelectOption
  ],
  animations: [
    trigger('calendarSlide', [
      transition(':enter', [
        style({ transform: '{{transformFrom}}', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ], { params: { transformFrom: 'translateX(100%)' } }),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: '{{transformTo}}', opacity: 0 })),
      ], { params: { transformTo: 'translateX(-100%)' } }),
    ]),
  ]
})
export class ScheludeComponent implements OnInit, AfterViewInit {
  // #region Variables
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  locale: string = 'es';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY || 1;

  selectedDate: Date | null = null;

  private touchStartX = 0;

  @Input()
  set taskList(value: TaskInterface[]) {
    if (value) {
      this._taskList = value;
      this._mapTasksToEvents(value);
    }
  }
  private _taskList: TaskInterface[] = [];

  @Output() selectedDateChange = new EventEmitter<Date>();

  // Template for the month cell
  @ViewChild(MonthCellTemplateComponent, { static: true })
    monthCellCmp!: MonthCellTemplateComponent;

  customCellTemplate!: TemplateRef<any>;

  modalData: {
    action: string;
    event: CalendarEvent;
  } | null = null;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  // Aux events
  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;
  
  // #Constructor
  constructor(private modal: NgbModal, private _cdr: ChangeDetectorRef) {}

  // #region Implements methods
  ngOnInit(): void {
    this.selectedDate = this.viewDate;
    this.selectedDateChange.emit(this.viewDate);
  }

  ngAfterViewInit(): void {
    this.customCellTemplate = this.monthCellCmp.templateRef;
    this._cdr.detectChanges();
  }

  // #region Methods
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.selectedDate = date;
      this.selectedDateChange.emit(date); // Se envia al padre del calendario el día seleccionado
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

   // Captura el inicio del toque
   @HostListener('touchstart', ['$event'])
   onTouchStart(event: TouchEvent) {
     this.touchStartX = event.changedTouches[0].clientX;
   }
 
   // Captura el final y detecta dirección
   @HostListener('touchend', ['$event'])
   onTouchEnd(event: TouchEvent) {
     const touchEndX = event.changedTouches[0].clientX;
     const deltaX = touchEndX - this.touchStartX;
 
     if (Math.abs(deltaX) > 50) {
       if (deltaX < 0) {
         this.onSwipeLeft();
       } else {
         this.onSwipeRight();
       }
     }
   }
 
   onSwipeLeft() {
     if (this.view === CalendarView.Month) {
       this.viewDate = addMonths(this.viewDate, 1);
     } else if (this.view === CalendarView.Week) {
       this.viewDate = addWeeks(this.viewDate, 1);
     } else if (this.view === CalendarView.Day) {
       this.viewDate = addDays(this.viewDate, 1);
     }
   }
 
   onSwipeRight() {
     if (this.view === CalendarView.Month) {
       this.viewDate = subMonths(this.viewDate, 1);
     } else if (this.view === CalendarView.Week) {
       this.viewDate = subWeeks(this.viewDate, 1);
     } else if (this.view === CalendarView.Day) {
       this.viewDate = subDays(this.viewDate, 1);
     }
   }
  incrementDate(factor: number): Date {
    switch (this.view) {
      case CalendarView.Month:
        return addDays(this.viewDate, 30 * factor);
      case CalendarView.Week:
        return addDays(this.viewDate, 7 * factor);
      case CalendarView.Day:
        return addDays(this.viewDate, 1 * factor);
      default:
        return this.viewDate;
    }
  }

  private _mapTasksToEvents(tasks: TaskInterface[]): void {
    console.log("Llega al schelude:");
    console.log(tasks);
    this.events = tasks.map(task => ({
      start: new Date(task.initialDate),
      end: new Date(task.finalDate),
      title: `${task?.taskType?.name || ""} - ${task.name || ""} para ${task.pets[0]?.name || ""}`,
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      meta: {
        taskId: task._id,
        userId: task.user._id,
        description: task.description || ''
      },
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false
      }
    }));

    this.refresh.next(); // actualiza la vista
  }
}