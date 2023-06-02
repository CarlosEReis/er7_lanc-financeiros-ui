import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Lancamento } from 'src/app/core/model';
import { PessoasService } from 'src/app/pessoas/pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriasService } from 'src/app/categorias/categorias.service';

import { LancamentoService } from '../lancamento.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  value: string = "RECEITA";
  // lancamento = new Lancamento();
  tipos: any[];
  categorias: any[] = [];
  pessoas: any[] = [];
  lancamentoForm!: FormGroup;
  uploadEmAndamento = false;

  constructor(
    private pessoasService: PessoasService,
    private categoriaService: CategoriasService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formbuilder: FormBuilder
  ) { 
    this.tipos = [{label: 'Receita', value: 'RECEITA'}, {label: 'Despesa', value: 'DESPESA'}];
  }

  ngOnInit(): void {
    this.configuraFormulario();
    const codigoLancamento = this.activeRouter.snapshot.params['codigo'];

    this.title.setTitle('Novo Lançamento')
    
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    } else {
      this.carregaPessoas();
      this.carregarCategorias();
    }
  }
  
  get editando(){
    return Boolean(this.activeRouter.snapshot.params['codigo']);
  }

  configuraFormulario(): void {
    this.lancamentoForm = this.formbuilder.group({
              codigo: [],
                tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
       dataPagamento: [],
           descricao: [ null, [ this.validaObrigatoriedade, this.validaTamanhoMinimo(5) ] ],
               valor: [ null, Validators.required ],
           categoria: this.formbuilder.group({
                        codigo: [ null, Validators.required ],
                          nome: [],
                      }),
              pessoa: this.formbuilder.group({
                        codigo: [ null, Validators.required ],
                          nome: []
                      }),
          observacao: [],
               anexo: [],
            urlAnexo: [],
    });
  }
   
  validaObrigatoriedade(input: FormControl) {
    return input.value ? null: { obrigatorio: true }
  }

  validaTamanhoMinimo(tamanho: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= tamanho) ? null: { tamanhoMinimo: { tamanho: tamanho } }
    }
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then((lancamento) => {
      this.converterDataParaString([lancamento]);
      //this.lancamento = lancamento;
      this.lancamentoForm.patchValue(lancamento);
      this.carregaPessoas();
      this.carregarCategorias();
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handler(erro))
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicioinarLancamento();
    }
  }

  adicioinarLancamento() {
    this.lancamentoService.adicionar(this.lancamentoForm.value)
      .then((lancamentoAdicionado) =>{
        this.messageService.add({
          severity: 'success',
          summary: 'Cadastro de Lancamento',
          detail: 'Lançamento cadastrado com sucesso.'
        })

        this.router.navigate(['lancamentos', lancamentoAdicionado.codigo])
      })
      .catch(erro => this.errorHandler.handler(erro))
  }

  /*TODO: Aberto uma issue (Edição de Lançamento #2 - https://github.com/CarlosEReis/ER7Money-API/issues/2), pois
  não é possível editar um lançamento, com uma pessoa inativa*/
  atualizarLancamento() {
    this.lancamentoService.atualizar(this.lancamentoForm.value)
      .then(
        (lancamento) => {
          this.converterDataParaString([lancamento])
          this.lancamentoForm.patchValue(lancamento);
          this.messageService.add({
            severity: 'success',
            summary: 'Edição de Lançamento',
            detail: 'Lancamento editado com sucesso.'
          })
          this.atualizarTituloEdicao();
        }
      )
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

  carregaPessoas() {
    this.pessoasService.listarTodas()
    .then(
      (pessoas) => {
        if(this.editando) {
          this.pessoas = pessoas
          .filter((pessoa: any) => pessoa.ativo || (pessoa.codigo === this.lancamentoForm.get('pessoa.codigo')?.value))
          .map((pessoa: any) => ({ label: pessoa.nome, value: pessoa.codigo }))
        } else {
          this.pessoas = pessoas
            .filter((pessoa: any) => pessoa.ativo)
            .map((pessoa: any) => ({ label: pessoa.nome, value: pessoa.codigo }) )
        }
      }
    )
    .catch(erro => this.errorHandler.handler(erro))
  }

  novo(): void {
    this.lancamentoForm.reset();
    this.lancamentoForm.patchValue(new Lancamento());
    this.router.navigate(['/lancamentos/novo']);
  }

  get urlUploadAnexo(): string {
    return this.lancamentoService.urlUploadAnexo();
  }

  get uploadHeaders(): HttpHeaders {
    return this.lancamentoService.uploadHeaders();
  }

  get nomeAnexo(): string {
    const nome: string = this.lancamentoForm.get('anexo')?.value;
    if (nome) {
      return nome.substring(nome.indexOf('_'), nome.length);
    }
    return '';
  }

  antesUploadAnexo() {
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event: any) {
    const anexo = event.originalEvent.body;    
    this.lancamentoForm.patchValue({
      anexo: anexo.nome,
      urlAnexo: anexo.anexo.replace('\\\\', 'https://')
    });
    this.uploadEmAndamento = false;
  }

  erroUpload(event: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro no anexo',
      detail: 'Erro ao tentar enviar o anexo.'
    });
    this.uploadEmAndamento = false;
  }

  private converterDataParaString(lancamentos: Lancamento[]) {
    for(const lancamento of lancamentos) {
      let offset = new Date().getTimezoneOffset() * 60000;
      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);
      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento!).getTime() + offset);
      }
    }
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Lançamento: ${this.lancamentoForm.get('descricao')?.value}`)
  }
}
