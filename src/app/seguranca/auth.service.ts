import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token'

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `grant_type=password&username=${usuario}&password=${senha}`;

    return firstValueFrom(this.http.post(`${this.oauthTokenUrl}`, body, { headers }))
      .then(response => console.log(response))
      .catch(erro => console.error(erro))
  }

}
