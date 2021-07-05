import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { BookData, BookListItem, BookResult } from '../book.model';
import { BookBody } from '../catalogue.model';
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

  private mapBookData(data: BookBody[]) {
    return data.map((d) =>
      this.bookApiService.getBookById(d.id).pipe(
        map<BookData, BookListItem>((book) => ({
          data: d,
          book,
        }))
      )
    );
  }

  ngOnInit() {
    this.books$ = this.fireApiService.getBooks().pipe(
      finalize(() => this.loadingService.stop()),
      switchMap((data) => forkJoin(this.mapBookData(data)))
    );
  }

  // private mapBookData(data: BookWithId[]) {
  //   return data.map((d) =>
  //     this.bookApiService.getBookById(d.id).pipe(
  //       map<BookData, BookListItem>((book) => ({
  //         data: d,
  //         book,
  //       }))
  //     )
  //   );
  // }

  // ngOnInit() {
  //   this.books$ = this.fireApiService.getBooks().pipe(
  //     finalize(() => this.loadingService.stop()),
  //     switchMap((data) =>
  //       forkJoin(this.mapBookData(data)).pipe(tap((x) => console.log(x)))
  //     )
  //   );
  // }
}
