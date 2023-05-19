import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';
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

    return firstValueFrom(this.http.post(`${this.oauthTokenUrl}`, body, { headers, withCredentials: true }))
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

  obterNovoAccessToken() {
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return firstValueFrom(this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true }))
    .then((response: any) => {
      this.armazenaToken(response.access_token);
      console.log('Novo Access Token obtido com sucesso.');
      return Promise.resolve(null);
    })
    .catch((response) => {
      console.log('Erro ao obter novo Access Token: ', response);
      return Promise.resolve(null);
    })
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  } 

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(permissoes: string[]) {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
        return true;
      }
    }
    return false;
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  logout() {
    return firstValueFrom(this.http.delete(this.tokensRevokeUrl, { withCredentials: true }))
    .then(() => this.limparAccessToken());
  }
}
