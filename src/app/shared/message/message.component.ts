import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

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
  @Input() control?: AbstractControl | FormControl | null;

  temErro(control: string): boolean{
    return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
  }

}
