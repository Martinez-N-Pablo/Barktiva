import { FormControl, FormGroup } from "@angular/forms";

/**
 * Mark as touched all the form controls,
 * if the control is also a FormGroup, 
 * it will mark as touched all the controls inside it using recursive
 * 
 * @param form: FormGroup
 */
export function validateForm(form: FormGroup): void {
    if (form) {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                validateForm(control);
            }
        });
    }
}