import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];
