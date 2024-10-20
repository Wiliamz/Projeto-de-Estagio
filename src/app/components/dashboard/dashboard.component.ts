import { Component, OnInit, NgModule } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { AccessCountComponent } from '../access-count/access-count.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgOptimizedImage, AccessCountComponent, HeaderComponent],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redireciona para a tela de login
  }
}