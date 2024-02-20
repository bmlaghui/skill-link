import { Routes } from '@angular/router';
import { AppLayoutComponent } from './views/layout/app-layout/app-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        canActivateChild: [authGuard], // Restringe el acceso a los
        children: [
            {
                path: 'dashboard',
                canActivate: [authGuard],
                loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'candidats',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'candidats/add',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/create/create.component').then(m => m.CreateComponent)
            },
            {
                path: 'candidats/:id',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/view/view.component').then(m => m.ViewComponent)
            },
            {
                path: 'entreprises',
                canActivate: [authGuard],
                loadComponent: () => import('./views/entreprises/listing/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'offres',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'candidatures',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'parametres',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'profile',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'notifications',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'messages',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'factures',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'paiements',
                canActivate: [authGuard],
                loadComponent: () => import('./views/users/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'administrateurs',
                canActivate: [authGuard],
                loadComponent: () => import('./views/admins/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'administrateurs/add',
                canActivate: [authGuard],
                loadComponent: () => import('./views/admins/create/create.component').then(m => m.CreateComponent)
            },
            {
                path: 'recuiters',
                canActivate: [authGuard],
                loadComponent: () => import('./views/recruiters/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: 'logs',
                canActivate: [authGuard],
                loadComponent: () => import('./views/logs/listing/listing.component').then(m => m.ListingComponent)
            },
            {
                path: '**',
                redirectTo: 'error'
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
