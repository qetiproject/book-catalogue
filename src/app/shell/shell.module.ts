import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent, NotFoundComponent } from '.';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: [HeaderComponent, NotFoundComponent],
  exports: [HeaderComponent],
})
export class ShellModule {}
