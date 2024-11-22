import { Injectable } from '@angular/core';
import {
  Auth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { Router } from '@angular/router';
import { Userdata } from '../models/userdata';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Userdata | undefined;

  constructor(private auth: Auth, private router: Router) {
    // Configurar o listener para o estado de autenticação
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // console.log("Usuário logado:", user);
        this.router.navigate(['/dashboard']);
      } else {
        // console.log("Usuário não está logado.");
      }
    });
  }

  async login(userData: Userdata): Promise<void> {
    try {
      // Configura a persistência para manter o usuário logado
      this.auth
        .setPersistence(browserLocalPersistence)
        .then((e) => {
          // console.log("Agluglu");
        })
        .catch((error) => {
          // console.error("Erro ao fazer login:", error);
          alert('Erro ao fazer login.');
        });
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password
      );

      // Verificar se o e-mail está confirmado
      if (userCredential.user && !userCredential.user.emailVerified) {
        await sendEmailVerification(userCredential.user);
        alert(
          'Verificação de e-mail enviada. Por favor, verifique seu e-mail para ativar sua conta.'
        );
      }

      this.router.navigate(['/dashboard']);
      alert('Login bem-sucedido!');
    } catch (error) {
      // console.error("Erro ao fazer login:", error);
      alert('Erro ao fazer login.');
    }
  }

  logout() {
    return signOut(this.auth);
  }

  // Para obter o e-mail do usuário atual
  getUserEmail() {
    // console.log(this.auth.currentUser);
    localStorage.getItem('firebase:authUser');
    return this.auth.currentUser?.email;
  }

  // Verifica se o usuário está logado e tem e-mail verificado
  isLoggedIn() {
    return this.auth.currentUser != null;
  }

  // Para garantir persistência de login em outras partes do app
  async setPersistenceLocal() {
    try {
      await setPersistence(this.auth, browserLocalPersistence);
      //console.log('Persistência de sessão configurada como "local".');
    } catch (error) {
      console.error('Erro ao configurar persistência:', error);
    }
  }
}
