import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BookResult, CountryResult } from '../book.model';

export const BOOK_BASE_URL = new InjectionToken<string>('book api token');

@Injectable()
export class BookApiService {
  constructor(
    @Inject(BOOK_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getBookByName(name: string): Observable<BookResult> {
    return this.http.get<BookResult>(`${this.baseUrl}?q=${name}`);
  }

  getCountry(code: string): Observable<CountryResult> {
    return this.http.get<CountryResult>(
      `https://restcountries.eu/rest/v2/name/${code}?fullText=true`
    );
  }
}
