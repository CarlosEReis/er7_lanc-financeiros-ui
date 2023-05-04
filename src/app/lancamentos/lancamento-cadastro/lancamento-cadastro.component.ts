import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoasService } from 'src/app/pessoas/pessoas.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  value: string = "RECEITA";
  tipos: any[];
  categorias: any[] = [];
  pessoas: any[] = [];

  constructor(
    private pessoasService: PessoasService,
    private categoriaService: CategoriasService,
    private errorHandler: ErrorHandlerService
  ) { 
    this.tipos = [{label: 'Receita', value: 'RECEITA'}, {label: 'Despesa', value: 'DESPESA'}];
  }

  ngOnInit(): void {
    this.careegaPessoas();
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
    .then(
      (categorias) => {
        this.categorias = 
          categorias.map((categoria: any) => ({ label: categoria.nome, value: categoria.codigo}))
    })
    .catch(erro => this.errorHandler.handler(erro));
  }

  careegaPessoas() {
    this.pessoasService.listarTodas()
    .then(
      (pessoas) => {
        this.pessoas = 
        pessoas
          .filter((peessoa: any) => peessoa.ativo)
          .map((pessoa: any) => ({ label: pessoa.nome, value: pessoa.codigo }) )

      }
    )
    .catch(erro => this.errorHandler.handler(erro))
  }
}
