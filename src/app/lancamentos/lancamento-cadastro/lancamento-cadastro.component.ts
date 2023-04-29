import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  value: string = "RECEITA";
  tipos: any[];
  categorias: any[];
  pessoas: any[];

  constructor() { 
    this.tipos = [{label: 'Receita', value: 'RECEITA'}, {label: 'Despesa', value: 'DESPESA'}];
    this.categorias = [{label: 'Alimentação', value: '1'}, {label: 'Tansporte', value: '2'}];
    this.pessoas = [
      { label: 'João da Silva', value: '1' },
      { label: 'Sebastião de Souza', value: '2' },
      { label: 'Maria dos Santos', value: '3' },
    ];
  }

  ngOnInit(): void {
  }

}
