import { HttpClient } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE ,LOCALE_ID, NgModule, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';


import localePt  from '@angular/common/locales/pt'
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

registerLocaleData(localePt, 'pt-BR')

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    DatePipe, 
    CurrencyPipe, 
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    TranslateService,
    Title,
    AuthService
  ]
})
export class CoreModule implements OnInit { 

  constructor(
    private config: PrimeNGConfig, 
    private translateService: TranslateService
  ){}
  
  ngOnInit(): void {
    this.translateService.setDefaultLang('pt');
    this.translateService.get('primeng')
      .subscribe(res => this.config.setTranslation(res));
  }


}
