import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private lancamentosUrl = environment.apiUrl + "/lancamentos";

  constructor(private http: HttpClient) { }

  lancamentosPorCategoria(): Promise<any[]> {
    return this.http.get(`${this.lancamentosUrl}/estatistica/por-categoria`)
      .toPromise()
      .then((response: any) => response);
  }

  lancamentosPorDia(): Promise<any[]> {
    return this.http.get(`${this.lancamentosUrl}/estatistica/por-dia`)
      .toPromise()
      .then((response: any) => {
        const dados = response;
        this.converterStringsParaDatas(dados);
        return dados;
      })
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      let offset = new Date().getTimezoneOffset() * 60000;

      dado.dia = new Date(dado.dia);
      dado.dia = new Date(new Date(dado.dia).getTime() + offset);
    }
  }
}
