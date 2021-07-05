import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogueComponent,
  },
  {
    path: 'add',
    component: AddBookComponent,
  },
  {
    path: ':id',
    component: BookDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogueRoutingModule {}
