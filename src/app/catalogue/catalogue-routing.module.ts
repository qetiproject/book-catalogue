import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue.component';
import { AddBookComponent } from './add-book/add-book.component';
const routes: Routes = [
  {
    path: '',
    component: CatalogueComponent
  },
  {
    path: 'add',
    component: AddBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
