import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: new Date(2017, 5, 30) , //'30/06/2017'
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: new Date(2017, 5, 10), //'10/06/2017'
      dataPagamento: new Date(2017, 5, 9), valor: 80000, pessoa: 'Atacado Brasil' }, //09/06/2017
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: new Date(2017, 6, 20), //'20/07/2017'
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
    { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: new Date(2017, 5, 5), //'05/06/2017'
      dataPagamento: new Date(2017, 4, 30), valor: 800, pessoa: 'Escola Abelha Rainha' }, //30/05/2017
    { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: new Date(2017, 7, 18), //'18/08/2017'
      dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2017, 6, 10), //'10/07/2017'
      dataPagamento: new Date(2017, 6, 9), valor: 1750, pessoa: 'Casa Nova Imóveis' }, //'09/07/2017'
    { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: new Date(2017, 7, 13), //'13/07/2017'
      dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
  ];  

}
