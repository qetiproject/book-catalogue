import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookListItem } from '../../book.model';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
})
export class BookListItemComponent implements OnInit {
  @Input() item: BookListItem;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToDetails() {
    this.router.navigate([
      `catalogue/${this.item.book.items[0].volumeInfo.title}`,
    ]);
  }
}
