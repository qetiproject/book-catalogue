import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { BookApiService } from '../services';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  searchKey: string;
  hasError: boolean;
  lastThreeSearches: string[] = [];

  constructor(
    private bookService: BookApiService,
    private loadingService: LoadingService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  private addToLastSearches(name: string) {
    if (this.lastThreeSearches.length < 3) {
      this.lastThreeSearches = [name, ...this.lastThreeSearches];
      this.storage.set('lastThreeSearches', this.lastThreeSearches);
      return;
    }
    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(1, 2)];

    this.storage.set('lastThreeSearches', this.lastThreeSearches);
  }

  private restoreState() {
    const lastThreeSearches = this.storage.get<string[]>('lastThreeSearches');
    if (lastThreeSearches?.length > 0) {
      this.lastThreeSearches = lastThreeSearches;
    }
  }
  ngOnInit(): void {
    this.restoreState();
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
}
