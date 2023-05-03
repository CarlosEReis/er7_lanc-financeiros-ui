import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pessoa } from '../pessoas-pesquisa/pessoas-pesquisa.component';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() rows = 0;
  @Input() totalRecords = 0;
  @Input() pessoas: Pessoa[] = []

  @Output() paginaAlteradaEvent = new EventEmitter();

  aoMudarDePagina(event: any) {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.paginaAlteradaEvent.emit(pagina);
  }

}
