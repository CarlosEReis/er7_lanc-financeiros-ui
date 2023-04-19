import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StyleClassModule,
    InputTextModule,
    ButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
