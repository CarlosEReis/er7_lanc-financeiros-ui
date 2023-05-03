import { Component, OnInit } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos: any[] = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void { }

  pesquisar(pagina = 0): void {
    this.lancamentoService.pesquisar(this.filtro)
      .then(
        (resultado) => {
          this.totalRegistros = resultado.total;
          this.lancamentos = resultado.lancamentos;
        }
      );
  }

  aoAlterarPagina(pageNumber: any) {
    this.filtro.pagina = pageNumber;
    this.pesquisar();
  }
}
