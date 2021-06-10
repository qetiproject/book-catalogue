import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }

  en() {
    this.translateService.use('en');
  }

  ka() {
    this.translateService.use('ka');
  }

}
