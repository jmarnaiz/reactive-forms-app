import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { CustomFieldComponent } from '../../../shared/components/custom-field/custom-field.component';

const MIN_LENGTH: number = 6;
@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule, CustomFieldComponent],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private _fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm = this._fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      // Valor por defecto, Validaciones síncronas, Validaciones asíncronas
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_LENGTH),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.checkUserName,
        ],
        ,
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_LENGTH),
          Validators.pattern(this.formUtils.numberPattern),
          Validators.pattern(this.formUtils.capitalCasePattern),
          Validators.pattern(this.formUtils.smallCasePattern),
          Validators.pattern(this.formUtils.specialCharacterPattern),
        ],
      ],
      password2: ['', Validators.required],
    },
    {
      validators: [this.formUtils.areEqualFields('password', 'password2')],
    }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}

/**
 * Las validaciones síncronas siempre se ejecutan antes que las asíncronas,
 * lo cual es maravilloso
 */
