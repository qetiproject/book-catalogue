import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { EventBusService } from 'src/app/services/event-bus.service';
import { LoadingService } from 'src/app/services/loading.service';
import { environment } from 'src/environments/environment';
import { Book, BookResult, Country } from '../book.model';
import { BookBody } from '../catalogue.model';
import { BookApiService, FireApiService } from '../services';
import { AddBookStorage } from './add-book.storage';

@Injectable()
export class AddBookFacade {
  searchKey: string;
  hasError: boolean;
  _selectedBook: Book;
  countries: string[] = [];

  get lastThreeSearches(): string[] {
    return this.addBookStorage.lastThreeSearches;
  }
  constructor(
    private loadingService: LoadingService,
    private bookService: BookApiService,
    private addBookStorage: AddBookStorage,
    private fireApiService: FireApiService,
    private eventBuService: EventBusService
  ) {}

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
          this.countries.push(bookByName.accessInfo?.country);
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

    this.addBookStorage.addToLastSearches(key);
    this.fetchBook(key);
  }

  restoreState() {
    this.addBookStorage.restoreState();
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
    };
  }

  getCountryPopulation(country: Country): string {
    return `Popultion of ${country.code}: ${country.population}`;
  }

  submit(body: BookBody) {
    this.loadingService.start();
    this.fireApiService
      .addBook(body)
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => {
        this._selectedBook = null;
        this.eventBuService.emit('resetForm');
      });
  }
}
