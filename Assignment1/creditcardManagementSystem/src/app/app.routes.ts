import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TransactionsListComponent } from './transactions/transactions-list/transactions-list.component';
import { CreditCardScreenComponent } from './credit-card/credit-card-screen/credit-card-screen.component';
import { CreditCardDetailsComponent } from './credit-card/credit-card-details/credit-card-details.component';
import { TransactionsOverviewComponent } from './transactions/transactions-overview/transactions-overview.component';

export const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'home', component: HomeComponent},
{path: 'creditcard', component: CreditCardScreenComponent},
{path: 'credit-card/:id', component: CreditCardDetailsComponent},
{path: 'transactions', component: TransactionsOverviewComponent}
];
