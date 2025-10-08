import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'credit-card/add',
    loadComponent: () => import('./credit-card/credit-card-screen/credit-card-screen.component').then(m => m.CreditCardScreenComponent)
  },
  {
    path: 'credit-card/:id',
    loadComponent: () => import('./credit-card/credit-card-details/credit-card-details.component').then(m => m.CreditCardDetailsComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./transactions/transactions-overview/transactions-overview.component').then(m => m.TransactionsOverviewComponent)
  }
];
