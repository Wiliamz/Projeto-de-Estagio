import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly validUsername: string = 'admin';
  private readonly validPassword: string = 'admin';
  
  constructor() { }

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}



