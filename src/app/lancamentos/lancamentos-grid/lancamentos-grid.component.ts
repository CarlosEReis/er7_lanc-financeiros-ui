import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LancamentoService } from '../lancamento.service';

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

  constructor(private lancamentoService: LancamentoService) { }

  aoMudarDePagina(event: LazyLoadEvent) {
    let pagina = 0
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }    
    this.paginaAlteradaEvent.emit(pagina)
  }

  excluir(codigo: number) {
    this.lancamentoService.excluir(codigo)
    .then(() => {
      this.paginaAlteradaEvent.emit(0)
    })
  }

}
