import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '../api/api.service';

export interface Transaction {
  uid: string;
  creditCard: string;
  amount: number;
  currency: string;
  comment: string;
  date: string;
}@Injectable({
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
    console.log('Adding transaction:', transaction);
    this.apiService.createTransaction(transaction)
      .subscribe({
        next: (newTransaction) => {
          console.log('API returned new transaction:', newTransaction);
          // Add to local state without reloading all
          this.transactionsSignal.update(transactions => [...transactions, newTransaction]);
        },
        error: (err) => console.error('Error adding transaction:', err)
      });
  }

  removeTransaction(uid: string): void {
    this.apiService.deleteTransaction(uid)
      .subscribe({
        next: () => {
          this.transactionsSignal.update(transactions => transactions.filter(t => t.uid !== uid));
          console.log('Transaction deleted successfully');
        },
        error: (err: any) => {
          // If 404, the transaction was already deleted (shared API), still remove from local state
          if (err.status === 404) {
            this.transactionsSignal.update(transactions => transactions.filter(t => t.uid !== uid));
            console.log('Transaction was already deleted, removed from local state');
          } else {
            console.error('Error removing transaction:', err);
          }
        }
      });
  }

  getTransactionsByCardNumber(cardNumber: string): Transaction[] {
    return this.transactionsSignal().filter(t => t.creditCard === cardNumber);
  }
}
