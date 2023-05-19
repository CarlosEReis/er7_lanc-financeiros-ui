import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  usuarioLogado =  '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private erroHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayload?.nome;
  }

  temPermissao(permissao: string) {
    return this.authService.temPermissao(permissao);
  }
  
  logout() {
    this.authService.logout()
    .then(() => this.router.navigate(['/login']))
    .catch(erro => this.erroHandler.handler(erro));
  }
}
