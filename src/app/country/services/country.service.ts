import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _http = inject(HttpClient);
  private _baseURL = 'https://restcountries.com/v3.1';
  private _flags = 'fields=cca3,name,borders';

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);

    const url = `${this._baseURL}/region/${region}/?${this._flags}`;

    return this._http.get<Country[]>(url);
  }

  getCountryByAlphaCode(code: string): Observable<Country> {
    const url = `${this._baseURL}/alpha/${code}/?${this._flags}`;

    return this._http.get<Country>(url);
  }

  getCountryBorderByCodes(borders: string[]): Observable<Country[]> {
    const params = {
      params: new HttpParams()
        .set('codes', `${borders}`)
        .set('fields', 'cca3,name,borders'),
    };
    const url = this._baseURL.concat('/alpha');
    // Hacerlo con params es lo mismo que construir manualmente la URL como
    // aquí debajo
    // const url = `${this._baseURL}/alpha?codes=${borders}/&${this._flags}`;
    return this._http.get<Country[]>(url, params);
  }

  /**
   * Esta función hace lo mismo que la anterior pero es menos eficiente porque
   * hace tantas llamadas como longitud de array que haya en borders, pero es
   * interesante a nivel didáctico por el uso de 'combineLatest' para agrupar
   * varios observables y emitir un valor cuando todos estén listos
   */
  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes) {
      return of([]);
    }
    const countriesRequests: Observable<Country>[] = [];
    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    });

    return combineLatest(countriesRequests);
  }
}
