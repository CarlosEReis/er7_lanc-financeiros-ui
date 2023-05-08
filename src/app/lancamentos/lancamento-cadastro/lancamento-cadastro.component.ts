import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Lancamento } from 'src/app/core/model';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  value: string = "RECEITA";
  lancamento = new Lancamento();
  tipos: any[];
  categorias: any[] = [];
  pessoas: any[] = [];

  constructor(
    private pessoasService: PessoasService,
    private categoriaService: CategoriasService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: ActivatedRoute
  ) { 
    this.tipos = [{label: 'Receita', value: 'RECEITA'}, {label: 'Despesa', value: 'DESPESA'}];
  }

  ngOnInit(): void {
    console.log(this.router.snapshot.params['codigo']);
    
    this.careegaPessoas();
    this.carregarCategorias();
  }

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() =>{
        this.messageService.add({
          severity: 'success',
          summary: 'Cadastro de Lancamento',
          detail: 'Lançamento cadastrado com sucesso.'
        })
        form.reset({ tipo: 'RECEITA'});
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handler(erro))
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
