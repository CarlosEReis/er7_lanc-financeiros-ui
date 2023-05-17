import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handler(errorResponse: any) {
    let msg = ''

    if (typeof errorResponse === 'string') {
      msg = errorResponse

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão inspirou. Faça o login novamente.'
      this.router.navigate(['/login']);
      
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar a sua requisição.';
      
      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação.'
      }

      try {
        msg = errorResponse.error[0].mensagemUsuario;
      } catch (error) { }
      console.log('Ocorreu um erro: ', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente, ou chame o administrador do sistema.'
      console.log('Ocorreu um erro: ', errorResponse);
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Opss...',
      detail: msg,
      life: 8000
    })
  }
}
