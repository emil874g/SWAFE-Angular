import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { CreditCardScreenComponent } from './credit-card/credit-card-screen/credit-card-screen.component';

export const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'home', component: HomeComponent},
{path: 'creditcard', component: CreditCardScreenComponent},
{path: 'transactions', component: TransactionsListComponent}
];
