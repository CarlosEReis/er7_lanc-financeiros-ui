import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  
  descricao: string = ''
  lancamentos: any[] = [];
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(): void {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoDe: this.dataVencimentoInicio,
      dataVencimentoAte: this.dataVencimentoFim
    }

    console.log(filtro);

    this.lancamentoService.pesquisar(filtro)
    .then(
      (lancamentosAPI) => this.lancamentos = lancamentosAPI
    );
  }

}
