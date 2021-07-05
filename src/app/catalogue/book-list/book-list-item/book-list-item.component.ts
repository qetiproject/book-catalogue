import { Component, Input, OnInit } from '@angular/core';
import { BookListItem } from '../../book.model';
import { BookApiService } from '../../services';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
})
export class BookListItemComponent implements OnInit {
  @Input() item: BookListItem;

  constructor(private bookApiService: BookApiService) {}

  ngOnInit(): void {
    // this.bookApiService
    //   .getBookById(this.book.id)
    //   .subscribe((x) => console.log(x));
  }
}
