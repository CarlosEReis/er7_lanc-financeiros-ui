import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';


@NgModule({
  declarations: [
    RelatorioLancamentosComponent
  ],
  imports: [
    CommonModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
