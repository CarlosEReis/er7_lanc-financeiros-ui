import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro {
  nome?: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }
  
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();
    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);
    
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
    .toPromise()
    .then( (responseAPI: any) => {
      const resultado = {
        pessoas: responseAPI['content'],
        total: responseAPI['totalElements']
      }
      return resultado;
    })
  }
  
}
