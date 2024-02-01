import { Routes } from '@angular/router';
import { AppLayoutComponent } from './views/layout/app-layout/app-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: 'dashboard',
                canActivate: [authGuard],
                loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'candidats',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'candidats/add',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/create/create.component').then(m => m.CreateComponent)
            },
            {
                path: 'candidats/:id',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'entreprises',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/entreprises/listing/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'offres',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'candidatures',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'parametres',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'profile',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'notifications',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'messages',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'factures',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'paiements',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'administrateurs',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/admins/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'recuiters',
                // canActivate: [AuthGuard],
                loadComponent: () => import('./views/recruiters/listing/listing.component').then(m => m.ListingComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./views/authentification/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./views/authentification/register/register.component').then(m => m.RegisterComponent),
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./views/authentification/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
    },
    {
        path: 'error',
        loadComponent: () => import('./views/error-404/error-404.component').then(m => m.Error404Component)
    },
    {
        path: '**',
        redirectTo: 'error'
    }

];
