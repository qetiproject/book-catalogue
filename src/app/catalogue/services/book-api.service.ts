import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookResult, CountryResult } from '../models';

export const BOOK_BASE_URL = new InjectionToken<string>('book api token');
export const COUNTRY_BASE_URL = new InjectionToken<string>('country api token');

@Injectable()
export class BookApiService {
  constructor(
    @Inject(BOOK_BASE_URL) private baseUrl: string,
    @Inject(COUNTRY_BASE_URL) private countryApiBase: string,
    private http: HttpClient
  ) {}

  getBooksByName(name: string): Observable<BookResult> {
    return this.http.get<BookResult>(`${this.baseUrl}?q=${name}`);
  }

  getCountry(code: string): Observable<CountryResult> {
    return this.http.get<CountryResult>(
      `${this.countryApiBase}/${code}?fullText=true`
    );
  }
}
