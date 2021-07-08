import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent, NotFoundComponent } from '.';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HeaderComponent, NotFoundComponent],
  exports: [HeaderComponent],
})
export class ShellModule {}
