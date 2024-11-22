import {
  Component,
  ENVIRONMENT_INITIALIZER,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Import the functions you need from the SDKs you need

import { getAnalytics } from 'firebase/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';

import { inject } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    DashboardComponent,
    AngularFireAuthModule,
    AngularFireModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _messaging = inject(Messaging);
  private readonly _env = inject(ENVIRONMENT_INITIALIZER);

  private messaging = inject(Messaging);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializa o Firebase
      const app = initializeApp(environment.firebase);
      this.messaging = getMessaging(app);
      this.requestPermission();
      this._getDeviceToken();
      this._onMessage();
    }
  }

  private _getDeviceToken(): void {
    getToken(this._messaging, {
      vapidKey:
        'BIIEDsz0LQ7UOLHmdV0RU0I5m8eUzZBZlx_haHDsdLXiFT3nHU8W3wfapdZYNT5gdIFFX3qlmmbdMcRuKzaNeFU',
    })
      .then((token) => {
        //console.log(token);
        // save the token in the server, or do whathever you want
        
      })
      .catch((error) => console.log('Token error', error));
  }

  private _onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => console.log('Message', payload),
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }

  requestPermission() {
    getToken(this.messaging, {
      vapidKey:
        'BIIEDsz0LQ7UOLHmdV0RU0I5m8eUzZBZlx_haHDsdLXiFT3nHU8W3wfapdZYNT5gdIFFX3qlmmbdMcRuKzaNeFU',
    })
      .then((currentToken) => {
        if (currentToken) {
          //console.log('Token de notificação:', currentToken);
          
        } else {
          // console.log('Nenhum token de notificação disponível.');
        }
      })
      .catch((err) => {
        // console.error('Erro ao obter o token de notificação:', err);
      });
  }
  
}
