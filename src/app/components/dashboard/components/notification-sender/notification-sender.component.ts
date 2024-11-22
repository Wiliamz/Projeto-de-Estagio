import { Component } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-sender',
  templateUrl: './notification-sender.component.html',
  styleUrls: ['./notification-sender.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class NotificationSenderComponent {
  title = '';
  body = '';
  token = '';
  message = '';
  topic = '';
  success = false;
  isLoading = true;

  constructor(private notificationService: NotificationService) {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  enviarNotificacao() {
    this.notificationService
      .sendNotification(this.title, this.body, this.token)
      .then((response) => {
        if (response.data?.success) {
          this.message = 'Notificação enviada com sucesso!';
          this.success = true;
        } else {
          this.message = `Erro ao enviar notificação: ${
            response.data?.error || 'Erro desconhecido'
          }`;
          console.log();
          this.success = false;
        }
      })
      .catch((error) => {
        console.log(error);
        this.message = `Erro ao enviar notificação: ${error.message}`;
        this.success = false;
      });
  }
}
