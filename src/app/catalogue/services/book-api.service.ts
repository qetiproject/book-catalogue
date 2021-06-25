import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const BOOK_BASE_URL = new InjectionToken<string>('book api token');

@Injectable()
export class BookApiService {
  constructor(
    @Inject(BOOK_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getBookByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?q=${name}`);
  }
  //  https://www.googleapis.com/books/v1/volumes/${name}?key=AIzaSyD-cADJV6R7xPXtzi9Q-Em8UaTcCKPW-KY
}
