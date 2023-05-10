import { Component, OnInit } from '@angular/core';
import { PessoaFiltro, PessoasService } from '../pessoas.service';
import { LazyLoadEvent } from 'primeng/api';
import { Title } from '@angular/platform-browser';

export interface Pessoa {
  codigo: number;
  nome: string;
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
  };
  ativo: boolean;
}

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;  
  filtro = new PessoaFiltro();
  pessoas: Pessoa[] = [];

  constructor(
    private pessoasService: PessoasService,
    private title: Title  
  ) {}

  ngOnInit(): void { 
    this.title.setTitle('Pesquisa de Pessoas')
  }

  pesquisar(pagina = 0): void {
    this.pessoasService.pesquisar(this.filtro)
      .then(
        (resultado) => {
          this.pessoas = resultado.pessoas
          this.totalRegistros = resultado.total
        }
      );
  }

  aoAlterarPagina(event: any) {
    this.filtro.pagina = event;
    this.pesquisar()
  }
}
