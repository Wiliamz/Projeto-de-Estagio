import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private functions: Functions) {}

  sendNotification(title: string, body: string, token: string): Promise<any> {
    const sendNotificationFn = httpsCallable(
      this.functions,
      'sendNotification'
    );
    return sendNotificationFn({ title, body, token });
  }

  async subscribeToTopic(token: string, topic: string): Promise<any> {
    console.log('Token recebido no serviço:', token); // Verificar o token
    console.log('Tópico recebido no serviço:', topic); // Verificar o tópico

    // Certificar-se de que o token e o tópico não sejam nulos ou undefined
    if (!token || !topic) {
      return Promise.reject('Token e Tópico são obrigatórios');
    }

    const subscribeToTopicFn = httpsCallable(
      this.functions,
      'subscribeToTopic'
    );

    // Passar os parâmetros de forma correta para a função
    try {
      const response = await subscribeToTopicFn({ token, topic });
      console.log('Resposta do Firebase:', response); // Para depuração
      return response;
    } catch (error) {
      console.error('Erro ao chamar subscribeToTopic:', error); // Para depuração
      return await Promise.reject(error);
    }
  }
}
