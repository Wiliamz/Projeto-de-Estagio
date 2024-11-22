import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotificationSenderComponent } from './components/dashboard/components/notification-sender/notification-sender.component';
import { AdminHomeComponent } from './components/dashboard/components/admin-home/admin-home.component';
import { NotificationTokenComponent } from './components/dashboard/components/notification-token/notification-token.component';
import { AnalyticsComponent } from './components/dashboard/components/analytics/analytics.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminHomeComponent }, // Rota padrão
      { path: 'notification-sender', component: NotificationSenderComponent },
      { path: 'notification-token', component: NotificationTokenComponent },
      { path: 'analytics', component: AnalyticsComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];
