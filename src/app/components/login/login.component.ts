import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service'; // Importa o serviço de autenticação
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, BtnPrimaryComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
        if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);  // Redireciona para a dashboard após login
    } else {
      this.errorMessage = 'Usuário ou senha incorretos';
    }
  }
}

// import { Component } from '@angular/core';
// import { AngularFireAuth} from '@angular/fire/auth';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(public auth: AngularFireAuth) { }

//   login() {
//     this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
//   }

//   logout() {
//     this.auth.signOut();
//   }
// }