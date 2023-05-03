import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { LancamentoService } from '../lancamento.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() rows = 0;
  @Input() totalRegistros = 0;
  @Input() lancamentos: any[] = [];

  @Output() paginaAlteradaEvent = new EventEmitter();

  @ViewChild('tabelaLancamentos') tabela: any;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private currencyPipe: CurrencyPipe
    ) { }

  aoMudarDePagina(event: LazyLoadEvent) {
    let pagina = 0
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }    
    this.paginaAlteradaEvent.emit(pagina)
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: `Deseja realmente exluir o lançamento <b>${lancamento.descricao}</b> no valor de <b>${this.currencyPipe.transform(lancamento.valor)}</b>.`,
      accept: () => this.excluir(lancamento.codigo)
    })
  }

  excluir(codigo: number) {
    this.lancamentoService.excluir(codigo)
    .then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Remover Lancamento',
        detail: 'Lançamento removido com sucesso.'
      })
      this.paginaAlteradaEvent.emit(0)
    })
  }

}
