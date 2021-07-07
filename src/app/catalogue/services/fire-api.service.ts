import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BookWithId } from '../book.model';
import { BookBody } from '../catalogue.model';

@Injectable({
  providedIn: 'root',
})
export class FireApiService {
  constructor(private store: AngularFirestore, private auth: AuthService) {}

  addBook(body: BookBody) {
    return from(this.store.collection('catalogue').add(body));
  }

  getBooks(): Observable<BookWithId[]> {
    return this.store
      .collection<BookBody>('catalogue', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .get()
      .pipe(
        map((res) =>
          res.docs.map<BookWithId>((d) => ({
            ...d.data(),
            id: d.id,
          }))
        )
      );
  }

  getBook(name: string): Observable<BookBody> {
    return this.store
      .collection<BookBody>('catalogue', (ref) =>
        ref.where('uid', '==', this.auth.userId)
      )
      .doc(name)
      .get()
      .pipe(map((res) => res.data()));
  }
}
