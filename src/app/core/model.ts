
export class Categoria{
    codigo?: number;
}

export class Pessoa {
    codigo?: number;
}

export class Lancamento {
    codigo?: number;
    tipo = 'RECEITA';
    descricao?: string;
    dataVencimento?: Date;
    dataPagamento?: Date;
    valor?: number;
    observacao?: string;
    categoria = new Categoria();
    pessoa = new Pessoa();
}
