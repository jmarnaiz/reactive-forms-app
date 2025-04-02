import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { CustomFieldComponent } from '../../../shared/components/custom-field/custom-field.component';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule, CustomFieldComponent],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private _fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(5)]],
    inStorage: [0, [Validators.required, Validators.min(1)]],
  });
  // Esta forma es muy tediosa, sobre todo si hay varios niveles
  // de identación. Imagina el caso de que hay una dirección con
  // varios campos (nombre calle, número, puerta, etc); habría que
  // crear otro FormGroup dentro de este, lo que sería ya bastante
  // jaleo.
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  onSubmit() {
    if (this.myForm.invalid) {
      // "Toca" todos los campos del formulario
      this.myForm.markAllAsTouched();
      return;
    }

    // Reset. Si se llama sin objeto, pone todos los valores a null.
    // Con un objeto, se le pueden pasar valores con los que se resetea
    // this.myForm.reset();
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
