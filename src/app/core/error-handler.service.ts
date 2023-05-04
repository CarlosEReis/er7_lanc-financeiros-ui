import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handler(errorResponse: any) {
    let msg = ''

    if (typeof errorResponse === 'string') {
      msg = errorResponse
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
