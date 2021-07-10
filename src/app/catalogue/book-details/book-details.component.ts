import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services';
import { BookResult, BookBody, WHEN_TO_READ, Status, RATINGS } from '../models';
import { BookApiService, FireApiService } from '../services';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  storeData$: Observable<BookBody>;
  bookData$: Observable<BookResult>;
  whenToRead = WHEN_TO_READ;
  status = Status;
  get ratings(): number[] {
    return RATINGS;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireApiService: FireApiService,
    private bookApiService: BookApiService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  private initBookDetails() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.loadingService.start();
    this.storeData$ = this.fireApiService.getBook(id).pipe(
      tap(
        (book) =>
          (this.bookData$ = this.bookApiService.getBooksByName(book.title))
      ),
      finalize(() => this.loadingService.stop())
    );
  }

  ngOnInit() {
    this.initBookDetails();
  }

  goBack() {
    this.router.navigate(['catalogue']);
  }
}
