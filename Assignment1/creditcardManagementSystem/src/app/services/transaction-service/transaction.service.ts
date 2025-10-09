import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '../api/api.service';

export interface Transaction {
  id: string;
  credit_card: string; 
  amount: number; 
  currency: string; 
  comment: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiService = inject(ApiService);

  private transactionsSignal = signal<Transaction[]>([]);
  transactions = computed(() => this.transactionsSignal());

  loadTransactions(): void {
    this.apiService.getTransactions()
      .subscribe({
        next: (transactions) => this.transactionsSignal.set(transactions),
        error: (err) => console.error('Error loading transactions:', err)
      });
  }

  addTransaction(transaction: Transaction): void {
    this.apiService.createTransaction(transaction)
      .subscribe({
        next: (newTransaction) => this.transactionsSignal.update(transactions => [...transactions, newTransaction]),
        error: (err) => console.error('Error adding transaction:', err)
      });
  }

  removeTransaction(uid: string): void {
    this.apiService.deleteTransaction(uid)
      .subscribe({
        next: () => this.transactionsSignal.update(transactions => transactions.filter(t => t.id !== uid)),
        error: (err) => console.error('Error removing transaction:', err)
      });
  }

  getTransactionsByCardNumber(cardNumber: string): Transaction[] {
    return this.transactionsSignal().filter(t => t.credit_card === cardNumber);
  }
}
