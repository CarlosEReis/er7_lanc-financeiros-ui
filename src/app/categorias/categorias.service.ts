import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private categoriasUrl = environment.apiUrl + '/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
   return this.http.get(this.categoriasUrl)
    .toPromise()
    .then(responseAPI => responseAPI);
  }
}
