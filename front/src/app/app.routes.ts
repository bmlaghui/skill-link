import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SalesComponent } from './components/sales/sales.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProbesComponent } from './components/probes/probes.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        'path': 'login',
        component: LoginComponent
    },
    {
        'path': 'register',
        component: RegisterComponent
    },
    {
        'path': 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],

        children: [
            { 
                path: '',
                component: HomeComponent,
                canActivate: [authGuard]
            },
            {
                path: 'probes',
                component: ProbesComponent,
                canActivate: [authGuard]
            }
        ]
    },
    {
        'path': '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
