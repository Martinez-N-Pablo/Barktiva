import { Component, forwardRef, Input, input, OnChanges, OnInit, SimpleChanges, } from'@angular/core';
import { CommonModule } from '@angular/common';
import { IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BorderErrorDirective } from '@app/core/directive/border-error.directive';
import { ErrorMessages } from '@app/core/magicStrings';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [CommonModule, IonInput, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent  implements OnInit {
  @Input() placeholder: string = '';
  @Input() areaLabel: string = '';
  @Input() type: string = 'text';
  @Input() inputmode: string = '';
  @Input() role: string = '';
  @Input() autocomplete?: string = '';
  @Input() class?: string = '';
  @Input() required?: boolean = false;
  @Input() control!: FormControl;
  @Input() name?: string = '';
  @Input() validState?: boolean = true;
  @Input() errorText: string = '';
  @Input() label: string = '';
  @Input() errors: any;

  errorMessage: any = ErrorMessages;

  constructor() { }

  ngOnInit() {
  }

  get error(): string | null {
    if (!this.errors) {
      return null;
    }

    const errorKey = Object.keys(this.errorMessage).find(key => this.errors[key]);
    return errorKey ? this.errorMessage[errorKey] : null;
  }
}
