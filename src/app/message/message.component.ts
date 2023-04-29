import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <small *ngIf="temErro(error)" [id]="id" class="p-error block">{{text}}</small>
  `,
  styles: [`
    .p-error {
      margin-top: 0.25rem;
    }
  `]
})
export class MessageComponent {

  @Input() id = '';
  @Input() text = '';
  @Input() error = '';
  @Input() control: any;

  temErro(control: string): boolean{
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
