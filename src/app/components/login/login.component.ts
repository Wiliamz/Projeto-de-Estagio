import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service'; // Importa o serviço de autenticação
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";

import { Userdata } from '../../models/userdata';





@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HeaderComponent, BtnPrimaryComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  user: Userdata = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {

  }

  login(): void {
    this.authService.login(this.user)

  }

  getUserEmail() {
    return this.user?.email;
  }

  logout() {
    this.authService.logout();
  }

}