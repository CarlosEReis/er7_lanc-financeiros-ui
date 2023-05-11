import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { PessoasService } from '../pessoas.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private title: Title,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const codigoPessoa = this.activeRouter.snapshot.params['codigo'];
    
    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {      
      this.carregarPessoa(codigoPessoa)
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPeloCodigo(codigo)
    .then((pessoa: Pessoa) => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.erroHandler.handler(erro))
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  atualizar(form: NgForm) {
    this.pessoaService.atualiza(this.pessoa)
    .then(((pessoa) => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
      this.messageService.add({
        severity: 'success',
        summary: 'Atualização de Pessoa',
        detail: 'Pessoa atualizada com sucesso. '
      })
    }))
    .catch(erro => this.erroHandler.handler(erro));
  }

  adicionar(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Adicionando Pessoa',
        detail: 'Pessoa adicionada com sucesso.'
      })
      form.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.erroHandler.handler(erro)) 
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['/pessoas/novo'])
  }

  private atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`)
  }
}
