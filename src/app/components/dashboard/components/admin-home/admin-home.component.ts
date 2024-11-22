import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterOutlet,
} from '@angular/router';


import { AccessCountComponent } from '../../../access-count/access-count.component';
import { HeaderComponent } from '../../../header/header.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { NewsletterService } from '../../../../services/newsletter.service';

interface User {
  name: string;
  email: string;
  registrationDate: Date; // A data em que foi adicionado ao banco
}

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    NgFor,
    NgOptimizedImage,
    AccessCountComponent,
    HeaderComponent,
    UserInfoComponent,
    BaseChartDirective,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent implements OnInit {
  users: any[] = [];

  lineChartData: ChartDataset<'line'>[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  constructor(private userService: NewsletterService) {}

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
    this.loadUserCounts();
  }

  async loadUserCounts() {
    const userCounts = await this.userService.countUsersByMonth();

    // Extrair labels (meses/anos) e dados (contagem de usuários)
    this.lineChartLabels = userCounts.map((item) => item.monthYear);
    this.lineChartData = [
      {
        data: userCounts.map((item) => item.count),
        label: 'Inscrições por Mês',
        borderColor: 'blue',
        backgroundColor: 'lightblue',
      },
    ];
  }
}
