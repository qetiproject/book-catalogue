import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { Book, BookResult, Country } from '../book.model';
import {
  BookBody,
  RATINGS,
  Status,
  WhenToReadSelect,
  WHEN_TO_READ,
} from '../catalogue.model';
import { BookApiService, FireApiService } from '../services';
import { AuthService } from 'src/app/services/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit, OnDestroy {
  private unsibscribe$ = new Subject();

  searchKey: string;
  hasError: boolean;
  lastThreeSearches: string[] = [];

  form: FormGroup;
  status = Status;
  submited = false;
  countries: string[] = [];

  private _selectedBook: Book;

  get selectedBook(): Book {
    return this._selectedBook;
  }

  get canReadLater(): boolean {
    return !!this.form.get('whenToRead');
  }

  get whenToRead(): WhenToReadSelect[] {
    return WHEN_TO_READ;
  }

  get ratings(): number[] {
    return RATINGS;
  }

  constructor(
    private bookService: BookApiService,
    private loadingService: LoadingService,
    private storage: StorageService,
    private fireApiService: FireApiService,
    private authService: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) {}

  private addToLastSearches(name: string) {
    if (this.lastThreeSearches.length < 3) {
      this.lastThreeSearches = [name, ...this.lastThreeSearches];
      this.storage.set('lastThreeSearches', this.lastThreeSearches);
      return;
    }
    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(0, 2)];

    this.storage.set('lastThreeSearches', this.lastThreeSearches);
  }

  private restoreState() {
    const lastThreeSearches = this.storage.get<string[]>('lastThreeSearches');
    if (lastThreeSearches?.length > 0) {
      this.lastThreeSearches = lastThreeSearches;
    }
  }

  private createForm() {
    this.form = new FormGroup({
      rating: new FormControl(1),
      review: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      status: new FormControl(Status.Read),
    });

    this.form
      .get('review')
      .valueChanges.pipe(takeUntil(this.unsibscribe$))
      .subscribe();

    this.form
      .get('rating')
      .valueChanges.pipe(takeUntil(this.unsibscribe$))
      .subscribe();

    this.form
      .get('status')
      .valueChanges.pipe(takeUntil(this.unsibscribe$))
      .subscribe();
  }

  ngOnInit(): void {
    this.restoreState();
    this.createForm();

    this.form
      .get('status')
      .valueChanges.pipe(takeUntil(this.unsibscribe$))
      .subscribe((status) => this.addControlsByStatus(status));
  }

  private getCountryWithPopulation(code: string): Observable<Country> {
    return this.bookService.getCountry(code).pipe(
      map((c) => {
        const countryFirst = c[0];
        return {
          code: countryFirst.alpha2Code,
          population: countryFirst.population,
        };
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  getCountryFlag(code: string): string {
    return `https://www.countryflags.io/${code}/shiny/64.png`;
  }

  getCountryPopulation(country: Country): string {
    return `Popultion of ${country.code}: ${country.population}`;
  }

  private mapBook(book: BookResult, countries: Country[]): Book {
    return {
      accessInfo: {
        pdf: book.items[0].accessInfo.pdf,
        webReaderLink: book.items[0].accessInfo.webReaderLink,
        country: countries,
      },
      textSnippet: book.items[0].searchInfo?.textSnippet,
      volumeInfo: {
        title: book.items[0].volumeInfo.title,
        authors: book.items[0].volumeInfo.authors,
        publisher: book.items[0].volumeInfo.publisher,
        publishedDate: book.items[0].volumeInfo.publishedDate,
        description: book.items[0].volumeInfo.description,
        printType: book.items[0].volumeInfo.printType,
        pageCount: book.items[0].volumeInfo.pageCount,
        contentVersion: book.items[0].volumeInfo.contentVersion,
        language: book.items[0].volumeInfo.language,
        previewLink: book.items[0].volumeInfo.previewLink,
        categories: book.items[0].volumeInfo.categories,
        imageLinks: {
          thumbnail: book.items[0].volumeInfo.imageLinks?.thumbnail,
          smallThumbnail: book.items[0].volumeInfo.imageLinks?.smallThumbnail,
        },
      },
      saleInfo: {
        buyLink: book.items[0].saleInfo.buyLink,
        isEbook: book.items[0].saleInfo.isEbook,
        saleability: book.items[0].saleInfo.saleability,
      },
      // bookId: book.items[0].bookId,
    };
  }

  //TODO: make error handly
  fetchBook(name: string) {
    this.loadingService.start();
    this.bookService
      .getBooksByName(name)
      .pipe(
        finalize(() => {
          this.loadingService.stop(), (this.searchKey = '');
        }),
        switchMap((book) => {
          const bookByName = book.items[0];
          this.countries = [];
          this.countries.push(bookByName.accessInfo.country);
          return forkJoin(
            this.countries.map((code) => this.getCountryWithPopulation(code))
          ).pipe(
            map<Country[], Book>((countries) => this.mapBook(book, countries))
          );
        })
      )
      .subscribe((book) => (this._selectedBook = book));
  }

  search(key: string) {
    if (!key) {
      this.hasError = true;
      return;
    }
    this.hasError = false;

    this.addToLastSearches(key);
    this.fetchBook(key);
  }

  submit() {
    this.submited = true;

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const body: BookBody = {
      title: this._selectedBook.volumeInfo.title,
      uid: this.authService.userId,
      rating: value.rating,
      review: value.review,
      status: value.status,
      whenToRead: value.whenToRead || '',
    };

    this.loadingService.start();
    this.fireApiService
      .addBook(body)
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => this.reset());
  }

  private reset() {
    this._selectedBook = null;
    this.form.reset();
    this.form.updateValueAndValidity();
    this.submited = false;
    this.form.get('review').setValue('');
    this.form.get('rating').setValue(1);
    this.form.get('status').setValue(Status.Read);
    this.translateService
      .get('catalogue.add_book.BOOK_HAS_BEEN_ADDED')
      .subscribe((value) => this.toastr.success(value));
  }

  ngOnDestroy() {
    this.unsibscribe$.next();
    this.unsibscribe$.unsubscribe();
  }

  private addControlsByStatus(status: Status) {
    switch (status) {
      case Status.ReadLater:
        this.form.addControl(
          'whenToRead',
          new FormControl(null, Validators.required)
        );
        break;
      case Status.Read:
        this.form.removeControl('whenToRead');
        break;
    }
  }
}
