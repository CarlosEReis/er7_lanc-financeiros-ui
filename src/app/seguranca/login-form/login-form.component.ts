import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  login(usuario: string, senha: string) {
    console.log(usuario);
    console.log(senha);
    
  }
}
