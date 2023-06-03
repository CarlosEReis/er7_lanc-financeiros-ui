import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { Cidade, Estado, Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  private pessoasUrl = environment.apiUrl + '/pessoas';
  private cidadesUrl = environment.apiUrl + '/cidades';
  private estadosUrls = environment.apiUrl + '/estados';

  constructor(private http: HttpClient) { }
  
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();
    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);
    
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
    .toPromise()
      .then( (responseAPI: any) => {
        const resultado = {
          pessoas: responseAPI['content'],
          total: responseAPI['totalElements']
        }
        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then((responseAPI: any) => responseAPI.content)
  }
  
  mudarStatus(pessoa: any): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}/ativo`, !pessoa.ativo)
      .toPromise()
      .then(() => {null});
  }

  excluir(codigo: number): Promise<void> {
    return this.http
      .delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => {null});
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return firstValueFrom(
      this.http.post<Pessoa>(this.pessoasUrl, pessoa)
    )
  }
  
  atualiza(pessoa: Pessoa): Promise<Pessoa> {
    return firstValueFrom(
      this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
    )
  }

  buscarPeloCodigo(codigo: number): Promise<Pessoa> {
    return firstValueFrom(
      this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
    )
  }

  listarEstados(): Promise<Estado[]> {
    return firstValueFrom(
      this.http.get<Estado[]>(`${this.estadosUrls}`));
  }

  listarCidades(codigoEstado: number): Promise<Cidade[]> {
    const params = new HttpParams().set('estado', codigoEstado);
    return firstValueFrom(
      this.http.get<Cidade[]>(this.cidadesUrl, { params }));
  }
}
