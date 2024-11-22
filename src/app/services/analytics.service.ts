import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private apiUrl =
    'https://analyticsreporting.googleapis.com/v4/reports:batchGet';
  private apiKey = 'AIzaSyDPoyQmlzYGQ7Z9LWTuSHvaYlTuQ-TsKoc'; // Substitua pela sua chave de API

  constructor(private http: HttpClient) {}

  // getActiveUsers(viewId: string, days: number = 7): Observable<any> {
  //   const body = {
  //     reportRequests: [
  //       {
  //         viewId: 'G-FT1W86TL67', // Substitua pelo ID da sua visão no Google Analytics
  //         dateRanges: [
  //           {
  //             startDate: `${days}daysAgo`,
  //             endDate: 'today',
  //           },
  //         ],
  //         metrics: [{ expression: 'ga:activeUsers' }],
  //       },
  //     ],
  //   };

  //   return this.http.post(`${this.apiUrl}?key=${this.apiKey}`, body);
  // }
  getUserActivity(): Observable<any> {
    const body = {
      entity: {
        propertyId: 'G-FT1W86TL67', // Substitua pelo ID da sua propriedade no Google Analytics
      },
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }],
      dateRanges: [
        {
          startDate: '30daysAgo',
          endDate: 'today',
        },
      ],
    };

    return this.http.post(`${this.apiUrl}/runReport?key=${this.apiKey}`, body);
  }
}
