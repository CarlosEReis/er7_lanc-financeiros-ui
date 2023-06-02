import { DatePipe } from '@angular/common';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../core/model';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoDe?: Date;
  dataVencimentoAte?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private lancamentosUrl = environment.apiUrl + '/lancamentos';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  urlUploadAnexo(): string {
    return this.lancamentosUrl + '/anexo';
  }

  uploadHeaders(): HttpHeaders {
    return new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> { 
    let params = new HttpParams();
    
    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao)
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoDe, 'yyyy-dd-MM')!);
    }
  
    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoAte, 'yyyy-dd-MM')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
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
  
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => { null });
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return firstValueFrom(
      this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
    )
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return firstValueFrom(
      this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
    );
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {    
    return firstValueFrom(
      this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
    );
  }

}
