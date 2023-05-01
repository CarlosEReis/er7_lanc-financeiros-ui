import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoDe?: Date;
  dataVencimentoAte?: Date;
  pagina = 0;
  itensPorpagona = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> { 
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();
    
    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorpagona);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao)
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoDe, 'yyyy-MM-dd')!);
    }
  
    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoAte, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise().then(
        (responseAPI: any) => {
           const resultado ={
            lancamentos: responseAPI['content'],
            total: responseAPI['totalElements']
          };
          return resultado;
        }
      );
  }
}
