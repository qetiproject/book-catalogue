import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {
  Book,
  BookBody,
  Country,
  RATINGS,
  Status,
  WhenToReadSelect,
  WHEN_TO_READ,
} from '../models';
import { AddBookFacade } from './add-book.fasade';
import { AddBookStorage } from './add-book.storage';
import { AuthService, EventBusService } from 'src/app/services';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
  providers: [AddBookFacade, AddBookStorage],
})
export class AddBookComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  form: FormGroup;
  status = Status;
  submited = false;

  get selectedBook(): Book {
    return this.addBookFacade._selectedBook;
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

  get countries() {
    return this.addBookFacade.countries;
  }

  get searchKey(): string {
    return this.addBookFacade.searchKey;
  }

  get hasError(): boolean {
    return this.addBookFacade.hasError;
  }

  get lastThreeSearches(): string[] {
    return this.addBookFacade.lastThreeSearches;
  }

  set searchKey(value: string) {
    this.addBookFacade.searchKey = value;
  }

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService,
    private addBookFacade: AddBookFacade,
    private eventBuService: EventBusService
  ) {}

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
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe();

    this.form
      .get('rating')
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe();

    this.form
      .get('status')
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe();
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

  private reset() {
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

  ngOnInit(): void {
    this.addBookFacade.restoreState();
    this.createForm();

    this.form
      .get('status')
      .valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((status) => this.addControlsByStatus(status));
    this.eventBuService
      .on('resetForm')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.reset());
  }

  search(key: string) {
    this.addBookFacade.search(key);
  }

  fetchBook(name: string) {
    this.addBookFacade.fetchBook(name);
  }

  getCountryFlag(code: string) {
    return this.addBookFacade.getCountryFlag(code);
  }

  getCountryPopulation(country: Country): string {
    return this.addBookFacade.getCountryPopulation(country);
  }

  submit() {
    this.submited = true;

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    const body: BookBody = {
      title: this.selectedBook.volumeInfo.title,
      uid: this.authService.userId,
      rating: value.rating,
      review: value.review,
      status: value.status,
      whenToRead: value.whenToRead || '',
    };

    this.addBookFacade.submit(body);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
