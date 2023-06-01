import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';


@NgModule({
  declarations: [
    RelatorioLancamentosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,
    ButtonModule,

    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
