import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent, NotFoundComponent } from './shell';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToItems = () => redirectLoggedInTo(['catalogue']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems },
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'catalogue',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () =>
      import('./catalogue/catalogue.module').then((m) => m.CatalogueModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
