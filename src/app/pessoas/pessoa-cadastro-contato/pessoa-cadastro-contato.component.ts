import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent {

  @Input() contatos!: Contato[];
  contato!: Contato;
  exibiContatoForm = false;
  contatoIndex!: number;

  constructor() { }

  get editando()  {
    return this.contato && this.contato.codigo;
  }

  preparaNovoContato(): void {
    this.exibiContatoForm = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length
  }

  preparaEdicaoContato(index: number): void {
    this.contato = {...this.contatos[index]};
    this.exibiContatoForm = true;
    this.contatoIndex = index;
  }

  adicionarContato(form: NgForm, index: number): void {
    const contato = {...this.contato};    
    this.contatos[this.contatoIndex] = contato;
    form.reset();
    this.exibiContatoForm = false;
  }

  removerContato(index: number): void {
    this.contatos.splice(index, 1);
  }

}
