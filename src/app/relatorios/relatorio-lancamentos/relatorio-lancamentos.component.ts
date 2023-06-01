import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio!: Date;
  periodofim!: Date;

  constructor() { }

  ngOnInit(): void {
  }

  gerar(): void {
    console.log('Vencimento de: ', this.periodoInicio);
    console.log('Vencimento até: ', this.periodofim);
    
  }

}
