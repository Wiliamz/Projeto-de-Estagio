import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-notification-token',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-token.component.html',
  styleUrl: './notification-token.component.scss',
})
export class NotificationTokenComponent {
  token = '';
  message = '';
  topic = '';
  success = false;

  constructor(private notificationService: NotificationService) {}

  subscribeToTopic() {
    console.log('Token:', this.token); // Verificar se o token está correto
    console.log('Topic:', this.topic); // Verificar se o tópico está correto

    if (!this.token || !this.topic) {
      this.message = 'Token e Tópico são obrigatórios';
      this.success = false;
      return;
    }

    this.notificationService.subscribeToTopic(this.token, this.topic).then(
      (response) => {
        if (response.data?.success) {
          this.message = `Inscrito no tópico: ${this.topic}`;
          this.success = true;
        } else {
          this.message = `Erro ao inscrever no tópico: ${response.data?.error}`;
          this.success = false;
        }
      },
      (error) => {
        this.message = `Erro na função: ${error.message}`;
        this.success = false;
      }
    );
  }
}
