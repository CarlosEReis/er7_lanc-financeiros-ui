import { DEFAULT_CURRENCY_CODE ,LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';

import localePt  from '@angular/common/locales/pt'


registerLocaleData(localePt, 'pt-BR')

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    DatePipe, { provide: LOCALE_ID, useValue: 'pt-BR' },
    CurrencyPipe, { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ]
})
export class CoreModule { }
