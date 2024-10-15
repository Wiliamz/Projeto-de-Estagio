import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'second-component', component: DashboardComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
    { path: '**', component: PageNotFoundComponent},  // Wildcard route for a 404 page
];
