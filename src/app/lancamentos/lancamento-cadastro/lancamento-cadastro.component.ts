import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  value: string = "RECEITA";
  tipos: any[];
  categorias: any[] = [];
  pessoas: any[];

  constructor(
    private categoriaService: CategoriasService,
    private errorHandler: ErrorHandlerService
  ) { 
    this.tipos = [{label: 'Receita', value: 'RECEITA'}, {label: 'Despesa', value: 'DESPESA'}];
    this.pessoas = [
      { label: 'João da Silva', value: '1' },
      { label: 'Sebastião de Souza', value: '2' },
      { label: 'Maria dos Santos', value: '3' },
    ];
  }

  ngOnInit(): void {
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
}
