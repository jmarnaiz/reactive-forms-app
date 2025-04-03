import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { filter, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private _fb = inject(FormBuilder);
  countryService = inject(CountryService);

  // En realidad 'regions' no va a cambiar y no haría falta el
  // uso de señales, pero por mantener la homogeneidad
  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this._fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  /**
   * El inconveniente de esta forma es que queda una suscripción en
   * escucha y habría que destruirla en el onDestroy
  formRegionChanged = this.myForm
    .get('region')
    ?.valueChanges.subscribe((region) => console.log('Region value: ', region));
   */

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this._onRegionChanged();
    const countrySubscription = this._onCountryChanged();
    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      // console.log('Form changed cleaned up');
    });
  });

  private _onRegionChanged(): Subscription {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => {
          this._initializeCountriesValues();
          this._initializeBordersValues();
        }),
        switchMap((region) => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe((countries) => this.countriesByRegion.set(countries));
  }

  private _onCountryChanged(): Subscription {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        filter((codes) => !!codes),
        tap(() => {
          this._initializeBordersValues();
        }),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode!)
        ),
        switchMap((countries) =>
          this.countryService.getCountryBorderByCodes(countries.borders)
        )
      )
      .subscribe((borders) => this.borders.set(borders));
  }

  private _initializeCountriesValues(): void {
    this.myForm.get('country')?.setValue('');
    this.countriesByRegion.set([]);
  }

  private _initializeBordersValues(): void {
    this.myForm.get('border')?.setValue('');
    this.borders.set([]);
  }

  /**
   * Lo poderoso de switch map es que, además de que genera un nuevo Observable,
   * detiene el ciclo del stream anterior si el valor cambia. (map solo transoforma
   * la respuesta, no genera uno nuevo)
   */
}
