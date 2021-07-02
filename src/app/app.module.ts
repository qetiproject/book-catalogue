import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { ShellModule } from './shell/shell.module';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export function TranslateHttpLoaderFactory(
  http: HttpClient
): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShellModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'ka',
    }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [AppComponent],
  providers: [HttpClient],
})
export class AppModule {}
