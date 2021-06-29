import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { Status } from '../catalogue.model';
import { BookApiService } from '../services';

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
  ratings = [1, 2, 3, 4, 5];
  submited = false;
  subs: Subscription[] = [];

  constructor(
    private bookService: BookApiService,
    private loadingService: LoadingService,
    private storage: StorageService
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
      .subscribe((form) => console.log(form));

    this.form
      .get('rating')
      .valueChanges.pipe(takeUntil(this.unsibscribe$))
      .subscribe((form) => console.log(form));

    this.form
      .get('status')
      .valueChanges.pipe(takeUntil(this.unsibscribe$))
      .subscribe((form) => console.log(form));
  }

  ngOnInit(): void {
    this.restoreState();
    this.createForm();
  }

  fetchBook(name: string) {
    this.loadingService.start();
    this.bookService
      .getBookByName(name)
      .pipe(finalize(() => (this.loadingService.stop(), (this.searchKey = ''))))
      .subscribe((x) => console.log(x));
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
  }

  ngOnDestroy() {
    this.unsibscribe$.next();
    this.unsibscribe$.unsubscribe();
  }
}
