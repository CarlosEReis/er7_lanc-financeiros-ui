import { Component, OnInit } from '@angular/core';

interface Pessoa {
  codigo: number,
  nome: string,
  endereco: {
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string
  },
  ativo: boolean
}

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas: Pessoa[] = [];

  constructor() { 
    this.pessoas = this.carregaPessoas();
  }

  ngOnInit(): void {
  }

  carregaPessoas(): Pessoa[] {
   return [
      {
        codigo: 1,
        nome: "João Silva",
        endereco: {
          logradouro: "Rua do Abacaxi",
          numero: "10",
          complemento: '',
          bairro: "Brasil",
          cep: "38400-121",
          cidade: "Uberlândia",
          estado: "MG"
        },
        ativo: true
      },
      {
        codigo: 2,
        nome: "Maria Rita",
        endereco: {
          logradouro: "Rua do Sabiá",
          numero: "110",
          complemento: "Apto 101",
          bairro: "Colina",
          cep: "11400-121",
          cidade: "Ribeirão Preto",
          estado: "SP"
        },
        ativo: true
      },
      {
        codigo: 3,
        nome: "Pedro Santos",
        endereco: {
          logradouro: "Rua da Bateria",
          numero: "23",
          complemento: '',
          bairro: "Morumbi",
          cep: "54212-121",
          cidade: "Goiânia",
          estado: "GO"
        },
        ativo: true
      },
      {
        codigo: 4,
        nome: "Ricardo Pereira",
        endereco: {
          logradouro: "Rua do Motorista",
          numero: "123",
          complemento: "Apto 302",
          bairro: "Aparecida",
          cep: "38400-121",
          cidade: "Salvador",
          estado: "BA"
        },
        ativo: true
      },
      {
        codigo: 5,
        nome: "Josué Mariano",
        endereco: {
          logradouro: "Av Rio Branco",
          numero: "321",
          complemento: '',
          bairro: "Jardins",
          cep: "56400-121",
          cidade: "Natal",
          estado: "RN"
        },
        ativo: true
      },
      {
        codigo: 6,
        nome: "Pedro Barbosa",
        endereco: {
          logradouro: "Av Brasil",
          numero: "100",
          complemento: '',
          bairro: "Tubalina",
          cep: "77400-121",
          cidade: "Porto Alegre",
          estado: "RS"
        },
        ativo: true
      },
      {
        codigo: 7,
        nome: "Henrique Medeiros",
        endereco: {
          logradouro: "Rua do Sapo",
          numero: "1120",
          complemento: "Apto 201",
          bairro: "Centro",
          cep: "12400-121",
          cidade: "Rio de Janeiro",
          estado: "RJ"
        },
        ativo: true
      },
      {
        codigo: 8,
        nome: "Carlos Santana",
        endereco: {
          logradouro: "Rua da Manga",
          numero: "433",
          complemento: '',
          bairro: "Centro",
          cep: "31400-121",
          cidade: "Belo Horizonte",
          estado: "MG"
        },
        ativo: true
      },
      {
        codigo: 9,
        nome: "Leonardo Oliveira",
        endereco: {
          logradouro: "Rua do Músico",
          numero: "566",
          complemento: '',
          bairro: "Segismundo Pereira",
          cep: "38400-001",
          cidade: "Uberlândia",
          estado: "MG"
        },
        ativo: true
      },
      {
        codigo: 10,
        nome: "Isabela Martins",
        endereco: {
          logradouro: "Rua da Terra",
          numero: "1233",
          complemento: "Apto 10",
          bairro: "Vigilato",
          cep: "99400-121",
          cidade: "Manaus",
          estado: "AM"
        },
        ativo: true
      }
    ]
    
  }
}
