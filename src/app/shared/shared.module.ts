import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent, LoadingSpinnerComponent } from './loading';
import { MustMatchDirective } from './directives/must-match.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent, LoadingSpinnerComponent, MustMatchDirective],
  exports: [TranslateModule, LoadingComponent, MustMatchDirective],
})
export class SharedModule {}
