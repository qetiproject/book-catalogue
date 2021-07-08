import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookResult, BookBody } from '../models';
import { BookApiService, FireApiService } from '../services';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  storeData$: Observable<BookBody>;
  bookData$: Observable<BookResult>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireApiService: FireApiService,
    private bookApiService: BookApiService,
    private router: Router
  ) {}

  private initBookDetails() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.storeData$ = this.fireApiService
      .getBook(id)
      .pipe(
        tap(
          (book) =>
            (this.bookData$ = this.bookApiService.getBooksByName(book.title))
        )
      );
  }

  ngOnInit() {
    this.initBookDetails();
  }

  goBack() {
    this.router.navigate(['catalogue']);
  }
}
