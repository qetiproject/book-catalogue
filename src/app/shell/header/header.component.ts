import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/shared/modules/language.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public language = Language;
  public languages: Language[] = [
    Language.kA,
    Language.EN
  ]
  constructor(
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  en() {
    this.translateService.use('en');
    console.log(this.translateService)
  }

  ka() {
    this.translateService.use('ka');
  }

  goToSignIn() {
    this.router.navigate(['sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['sign-up']);
  }

  private isLanguage(lang: string): boolean {
    const defaultLang = this.translateService.defaultLang;
    const currentLang = this.translateService.currentLang;

    return currentLang ? currentLang === lang : defaultLang === lang;
  }

  get isKa(): boolean {
    return this.isLanguage('ka');
  }

  get isEn(): boolean {
    return this.isLanguage('en');
  }

}
