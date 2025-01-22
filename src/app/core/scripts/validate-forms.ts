import { inject, Renderer2 } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

/**
 * Mark as touched all the form controls,
 * if the control is also a FormGroup, 
 * it will mark as touched all the controls inside it using recursive.
 * Then call _updateBorderColor and set error class if the control is invalid.
 * 
 * @param form: FormGroup
 */
export function validateForm(form: FormGroup): void {
    if (form) {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
                _updateBorderColor(control, field);
            } else if (control instanceof FormGroup) {
                validateForm(control);
            }
        });
    }
}

/**
 * If control is invalid and has been touched,
 * then using the element selected by query set error class.
 * 
 * @param control: FormControl; Control from FormGroup
 * @param field: string; Input name
 * @returns 
 */
function _updateBorderColor(control: FormControl, field: string): void {
    const element = document.querySelector(`ion-input[name="${field}"]`) as HTMLElement;

    if (!element) {
        console.warn(`Elemento no encontrado para el campo: ${field}`);
        return;
    }

    if (control.invalid && (control.touched || control.dirty)) {
        element.classList.add('error');
    } else {
        element.classList.remove('error');
    }
}