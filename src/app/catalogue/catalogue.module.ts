import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookApiService, BOOK_BASE_URL } from './services';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CatalogueComponent, AddBookComponent],
  providers: [
    BookApiService,
    {
      provide: BOOK_BASE_URL,
      useValue: environment.bookApiBase,
    },
  ],
})
export class CatalogueModule {}
