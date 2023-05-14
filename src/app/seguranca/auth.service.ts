import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token'
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService  
  ) {
    this.carregaToken();
   }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `grant_type=password&username=${usuario}&password=${senha}`;

    return firstValueFrom(this.http.post(`${this.oauthTokenUrl}`, body, { headers }))
      .then((response: any) => {
        this.armazenaToken(response.access_token);
      })
      .catch((errorResponse: any) => {
        if (errorResponse.status === 400 && errorResponse.error.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválido.');
        }
        return Promise.reject(errorResponse);
    });
  }

  armazenaToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregaToken() {
    const token = localStorage.getItem('token')
    if (token) {
      this.armazenaToken(token);
    }
  }
}
