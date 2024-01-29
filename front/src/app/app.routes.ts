import { Routes } from '@angular/router';


import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        'path': 'login',
        loadComponent: () => import('./core/components/authentification/login/login.component').then(m => m.LoginComponent)
    },
    {
        'path': 'register',
        loadComponent: () => import('./core/components/authentification/register/register.component').then(m => m.RegisterComponent)
    },
    {
        'path': 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./feature/dashbord/dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent),
    },
    {
        'path': 'users',
        canActivate: [authGuard],
        loadComponent: () => import('./feature/users/listing/listing.component').then(m => m.ListingComponent),
    },
    {
        'path': '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
