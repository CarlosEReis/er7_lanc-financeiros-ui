import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private lancamentosUrl = environment.apiUrl + '/lancamentos';  

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { }

  relatorioLancamentosPorPessoa(dataInicial: Date, dataFinal: Date): Promise<Blob> {

    const params = new HttpParams()
      .set('inicio', this.datePipe.transform(dataInicial, 'yyyy-MM-dd')!)
      .set('fim', this.datePipe.transform(dataFinal, 'yyyy-MM-dd')!)

    return firstValueFrom(
      this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, { params, responseType: 'blob' })
    );
  }

}
