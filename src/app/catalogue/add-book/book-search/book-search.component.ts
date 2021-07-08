import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSearchComponent implements OnInit {
  @Output() searchBook = new EventEmitter();
  @Output() fetchBookChange = new EventEmitter();
  @Input() searchKey: string;
  @Input() hasError: boolean;
  @Input() lastThreeSearches: string[] = [];

  constructor() {}

  ngOnInit() {}

  search(key: string) {
    this.searchBook.emit(key);
  }

  fetchBook(name: string) {
    this.fetchBookChange.emit(name);
  }
}
