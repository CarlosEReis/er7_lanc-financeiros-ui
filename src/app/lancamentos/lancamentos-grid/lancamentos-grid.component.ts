import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() rows = 0;
  @Input() totalRegistros = 0;
  @Input() lancamentos: any[] = [];

  @Output() paginaAlteradaEvent = new EventEmitter();


  aoMudarDePagina(event: LazyLoadEvent) {
    let pagina = 0
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }    
    this.paginaAlteradaEvent.emit(pagina)
  }

}
