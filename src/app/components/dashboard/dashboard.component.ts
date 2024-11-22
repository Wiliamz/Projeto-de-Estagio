import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { AccessCountComponent } from '../access-count/access-count.component';
import { HeaderComponent } from '../header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NewsletterService } from '../../services/newsletter.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouterOutlet,
  RouterLink,
} from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isLoading = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });
  }
}
