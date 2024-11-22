import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

export interface User {
  name: string;
  email: string;
  createdAt: string; // ou Date, dependendo de como você está armazenando
}
@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  constructor(private firestore: Firestore) {}

  // Método para verificar se o e-mail já existe
  async emailExists(email: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Método para adicionar o usuário se o e-mail não existir
  async addUser(name: string, email: string) {
    const createdAt = new Date().toLocaleDateString('en-US');
    const exists = await this.emailExists(email);
    if (exists) {
      throw 'E-mail já cadastrado.';
    }
    const usersRef = collection(this.firestore, 'users');
    return await addDoc(usersRef, { name, email, createdAt });
  }

  // Método para buscar todos os usuários
  async getAllUsers() {
    const usersRef = collection(this.firestore, 'users');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map((doc) => doc.data());
  }
  async countUsersByMonth(): Promise<{ monthYear: string; count: number }[]> {
    const usersRef = collection(this.firestore, 'users');
    const querySnapshot = await getDocs(usersRef);

    // Objeto para armazenar a contagem
    const monthlyCounts: { [key: string]: number } = {};

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data() as User;
      const registrationDate = new Date(data.createdAt); // Supondo que você tenha 'createdAt' como um campo no documento
      const monthYear = registrationDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      // Incrementa a contagem para o mês/ano correspondente
      monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
    });

    // Converte o objeto em um array de resultados
    return Object.keys(monthlyCounts).map((monthYear) => ({
      monthYear,
      count: monthlyCounts[monthYear],
    }));
  }
}
