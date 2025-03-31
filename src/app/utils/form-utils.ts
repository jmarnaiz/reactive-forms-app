import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils._getTextErrors(errors);
  }

  static getFieldErrorInArray(form: FormArray, index: number): string | null {
    if (!form.controls.length) return null;

    const errors = form.controls[index].errors ?? {};

    return FormUtils._getTextErrors(errors);
  }

  private static _getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Mínimo de ${errors['min'].min} caracteres`;
      }
    }

    return null;
  }
}
