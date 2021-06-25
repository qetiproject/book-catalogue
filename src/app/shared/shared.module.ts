import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent, LoadingSpinnerComponent } from './loading';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    TranslateModule,
    LoadingComponent
  ]
})
export class SharedModule { }
