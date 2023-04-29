import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { StyleClassModule } from 'primeng/styleclass';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';

import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    PessoaCadastroComponent,
    MessageComponent,
    PessoasGridComponent
  ],
  imports: [
    BadgeModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
    TableModule,
    StyleClassModule,
    TooltipModule,
    InputTextareaModule,
    SelectButtonModule,
    FormsModule,
    DropdownModule,

    LancamentosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
