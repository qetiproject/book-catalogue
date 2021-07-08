import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services';
import { BookListItem, BookResult, BookWithId } from '../models';
import { BookApiService, FireApiService } from '../services';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books$: Observable<BookListItem[]>;

  constructor(
    private fireApiService: FireApiService,
    private bookApiService: BookApiService,
    private loadingService: LoadingService
  ) {}

  private mapBookData(data: BookWithId[]) {
    return data.map((d) =>
      this.bookApiService.getBooksByName(d.title).pipe(
        map<BookResult, BookListItem>((book) => ({
          data: d,
          book,
        }))
      )
    );
  }

  ngOnInit() {
    this.loadingService.start();
    this.books$ = this.fireApiService.getBooks().pipe(
      switchMap((data) => forkJoin(this.mapBookData(data))),
      finalize(() => this.loadingService.stop())
    );
  }
}
