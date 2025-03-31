import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

const MIN_GAMES = 3;
@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private _fb: FormBuilder = inject(FormBuilder);
  minGames = MIN_GAMES;
  formUtils = FormUtils;

  myForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this._fb.array(
      [
        ['Metal Gear', [Validators.required, Validators.minLength(3)]],
        [
          'Final Fantasy VII Remake',
          [Validators.required, Validators.minLength(3)],
        ],
      ],
      Validators.minLength(this.minGames)
      // Validador no a los campos, si no al array. Con esto
      // establezco que debe tener al menos 3 valores
    ),
  });

  // newFavoriteControl = this._fb.control([])
  newFavoriteControl = new FormControl('', Validators.required);

  get favoriteGames(): FormArray {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  addToFavorites() {
    if (this.newFavoriteControl.invalid) return;

    const newGame = this.newFavoriteControl.value;
    this.favoriteGames.push(this._fb.control(newGame, Validators.required));
    // this.favoriteGames.push(this.newFavoriteControl);

    this.newFavoriteControl.reset();
  }

  deleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
