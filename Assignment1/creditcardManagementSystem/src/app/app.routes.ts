import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'creditcard', loadComponent: () => import('./credit-card/credit-card-screen/credit-card-screen.component').then(m => m.CreditCardScreenComponent), canActivate: [authGuard] },
  { path: 'credit-card/:cardNumber', loadComponent: () => import('./credit-card/credit-card-details/credit-card-details.component').then(m => m.CreditCardDetailsComponent), canActivate: [authGuard] },
  { path: 'transactions', loadComponent: () => import('./transactions/transactions-overview/transactions-overview.component').then(m => m.TransactionsOverviewComponent), canActivate: [authGuard] },
  { path: 'transactions/add', loadComponent: () => import('./transactions/add-transaction/add-transaction.component').then(m => m.AddTransactionComponent), canActivate: [authGuard] }
];
