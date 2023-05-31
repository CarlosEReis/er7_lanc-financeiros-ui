import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  optionsPie = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return formattedValue;
          }
        }
      }
    }
  }

  optionsLine = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    }
  }

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe  
  ) { }

  ngOnInit(): void {
    this.configuraGraficoPizza();
    this.configuraGraficoLinha();
  }

  private configuraGraficoPizza(): void {
    this.dashboardService.lancamentosPorCategoria().then( dados => {
      this.pieChartData = {
        labels: dados.map( d => d.categoria.nome),
        datasets: [
          {
            data: dados.map(d => d.total),
            backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
          }
        ]
      }
    })
  }

  private configuraGraficoLinha(): void {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {

        const diasDoMes = this.diasDoMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

        this.lineChartData = {
          labels: this.diasDoMes(),
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC',
              tension: 0.4
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00',
              tension: 0.4
            }
          ]          
        }
    });
  }

  private totaisPorCadaDiaMes(dados: any, diasDoMes: number[]): number[] {
    const totais: number[] = [];
    for(const dia of diasDoMes) {
      let total = 0;

      for(const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }
      totais.push(total);
    }    
    return totais;
  }

  private diasDoMes(): number[] {
    const dataAtual = new Date()
    const qtdeDiasMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth()+1, 0).getDate()

    let dias: number[] = [];
    for (let diaAtual = 1; diaAtual <= qtdeDiasMes; diaAtual++) {
      dias.push(diaAtual)
    }
    return dias;
  }
}
