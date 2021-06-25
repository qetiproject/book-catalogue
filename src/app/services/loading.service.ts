import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading: Subject<boolean> = new Subject();

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  start() {
    this._loading.next(true);
  }

  stop() {
    this._loading.next(false);
  }
}
