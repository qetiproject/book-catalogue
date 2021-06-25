import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    TranslateModule
  ],
  declarations: [CatalogueComponent, AddBookComponent]
})
export class CatalogueModule { }
