import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookData, BookResult } from '../book.model';
import { BookBody } from '../catalogue.model';
import { BookApiService, FireApiService } from '../services';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  storeData$: Observable<BookBody>;
  bookData$: Observable<BookData>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireApiService: FireApiService,
    private bookApiService: BookApiService,
    private router: Router
  ) {}

  private initBookDetails() {
    const name = this.activatedRoute.snapshot.params['name'];
    // this.storeData$ = this.fireApiService;
    // .getBook(name)
    // .pipe(
    //   tap(
    //     (book) =>
    //       (this.bookData$ = this.bookApiService.getBookByName(book.title))
    //   )
    // );
  }

  ngOnInit() {
    this.initBookDetails();
  }

  goBack() {
    this.router.navigate(['catalogue']);
  }
}
