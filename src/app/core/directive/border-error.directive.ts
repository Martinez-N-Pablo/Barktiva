import { Directive, ElementRef, inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[borderError]',
  standalone: true
})
export class BorderErrorDirective implements OnInit, OnChanges {
  private el: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  @Input() control!: FormControl;

  constructor() { }
  ngOnInit(): void {
    if (this.control) {
      // Escucha los cambios en el estado del FormControl
      this.control.statusChanges.subscribe(() => this._updateBorderColor());
      // Inicializa el color del borde
      this._updateBorderColor();
    } else {
      console.warn('FormControl no inicializado en la directiva');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.control) {
    //   // Listen for changes in the control status
    //   this.control.statusChanges.subscribe(() => this._updateBorderColor());
    //   // Inicializa el color del borde
    //   this._updateBorderColor();
    // }

    if (changes['control'] && this.control) {
      // Escucha los cambios en el estado del control
      this.control.statusChanges.subscribe(() => this._updateBorderColor());
      // Inicializa el color del borde
      this._updateBorderColor();
    }
  }

  private _updateBorderColor(): void {
    const element = this.el.nativeElement; // Get the native element of the control

    // If the control is invalid when touched or dirty, add a red border
    if (this.control.invalid && (this.control.touched || this.control.dirty)) {
      this.renderer.addClass(element, 'error');
    } else {
      // If its not, remove the border color red
      this.renderer.removeClass(element, 'error');
    }
  }
}
