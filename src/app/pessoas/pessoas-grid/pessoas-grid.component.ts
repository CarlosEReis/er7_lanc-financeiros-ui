import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Pessoa } from '../pessoas-pesquisa/pessoas-pesquisa.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PessoasService } from '../pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() rows = 0;
  @Input() totalRecords = 0;
  @Input() pessoas: Pessoa[] = []

  @Output() paginaAlteradaEvent = new EventEmitter();
  @ViewChild('tabelaPessoas') tarefa: any;

  constructor(
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  aoMudarDePagina(event: any) {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.paginaAlteradaEvent.emit(pagina);
  }

  mudarStatus(pessoa: any) {
    this.pessoaService.mudarStatus(pessoa)
    .then(() => {
      this.messageService.add({
        severity: pessoa.ativo ? 'warn': 'success',
        summary: 'Alteração de Status',
        detail: `${pessoa.nome} foi ${pessoa.ativo ? 'desativado' : 'ativado'} com sucesso.`
      })
      this.paginaAlteradaEvent.emit(0);
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: `Deseja realmente excluir <b>${pessoa.nome}</b>?`,
      accept: () => this.excluir(pessoa.codigo)
    })
  }

  excluir(codigo: number) {
    this.pessoaService.excluir(codigo)
    .then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Remover Pessoa',
        detail: 'Pessoa removida com sucesso.'
      })
      this.paginaAlteradaEvent.emit(0);
    })
    .catch(erro => this.errorHandler.handler(erro))
  }
}
