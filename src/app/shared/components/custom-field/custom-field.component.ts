import { Component, Input } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'custom-field',
  imports: [],
  templateUrl: './custom-field.component.html',
})
export class CustomFieldComponent {
  formUtils = FormUtils;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) fieldName: string = '';
}
