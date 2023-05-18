import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router  
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (this.authService.isAccessTokenInvalido()) {
        console.log('Navegação com access token inválido. Obtendo novo token...');

        return this.authService.obterNovoAccessToken()
        .then(() => {
          if (this.authService.isAccessTokenInvalido()) {
            console.log(this.constructor.name);
            this.router.navigate(['/login']);
            return false;
          }
          return this.podeAcessarRota(route.data['roles']);
        })
      }

    return this.podeAcessarRota(route.data['roles']);;
  }

  podeAcessarRota(roles: string[]): boolean {
    if (roles && !this.authService.temQualquerPermissao(roles)) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }
  
}
