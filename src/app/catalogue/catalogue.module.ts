import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BookApiService,
  BOOK_BASE_URL,
  COUNTRY_BASE_URL,
  FireApiService,
} from './services';
import { environment } from 'src/environments/environment';
import {
  AddBookComponent,
  BookDetailsComponent,
  BookListComponent,
  BookListItemComponent,
  BookSearchComponent,
  CatalogueComponent,
} from '.';
import { COUNTRY_FLAG_URL } from './add-book/add-book.fasade';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    CatalogueComponent,
    AddBookComponent,
    BookListComponent,
    BookListItemComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    BookSearchComponent,
  ],
  providers: [
    BookApiService,
    FireApiService,
    {
      provide: BOOK_BASE_URL,
      useValue: environment.bookApiBase,
    },
    {
      provide: COUNTRY_BASE_URL,
      useValue: environment.countryApiBase,
    },
    {
      provide: COUNTRY_FLAG_URL,
      useValue: environment.countryFlagApi,
    },
  ],
})
export class CatalogueModule {}
