import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../shared/services/transaction.service';
import { CreditCardService } from '../../shared/services/credit-card.service';
import { Transaction } from '../../shared/models/transaction.model';
import { CreditCard } from '../../shared/models/credit-card.model';
import { TransactionsListComponent } from '../transactions-list/transactions-list.component';

@Component({
  selector: 'app-transactions-overview',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionsListComponent],
  templateUrl: './transactions-overview.component.html',
  styleUrl: './transactions-overview.component.scss'
})
export class TransactionsOverviewComponent implements OnInit {
  private transactionService = inject(TransactionService);
  private creditCardService = inject(CreditCardService);

  transactions = signal<Transaction[]>([]);
  creditCards = signal<CreditCard[]>([]);
  filteredTransactions = signal<Transaction[]>([]);
  
  loading = signal(true);
  showAddForm = signal(false);
  filterCardNumber = '';

  newTransaction: Transaction = {
    creditCardId: 0,
    amount: 0,
    currency: 'USD',
    comment: '',
    date: new Date().toISOString().split('T')[0]
  };

  errors: { [key: string]: string } = {};

  ngOnInit(): void {
    this.loadCreditCards();
    this.loadTransactions();
  }

  loadCreditCards(): void {
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        this.creditCards.set(cards);
      },
      error: (err) => {
        console.error('Error loading credit cards:', err);
      }
    });
  }

  loadTransactions(): void {
    this.loading.set(true);
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        // Map card numbers to transactions
        const cards = this.creditCards();
        const transactionsWithCardNumbers = transactions.map(t => {
          const card = cards.find(c => c.id === t.creditCardId);
          return { ...t, card_number: card?.card_number || 'Unknown' };
        });
        this.transactions.set(transactionsWithCardNumbers);
        this.filteredTransactions.set(transactionsWithCardNumbers);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Error loading transactions:', err);
      }
    });
  }

  filterTransactions(): void {
    const allTransactions = this.transactions();
    if (!this.filterCardNumber) {
      this.filteredTransactions.set(allTransactions);
    } else {
      const filtered = allTransactions.filter(t => 
        t.card_number?.includes(this.filterCardNumber)
      );
      this.filteredTransactions.set(filtered);
    }
  }

  clearFilter(): void {
    this.filterCardNumber = '';
    this.filteredTransactions.set(this.transactions());
  }

  toggleAddForm(): void {
    this.showAddForm.set(!this.showAddForm());
    if (!this.showAddForm()) {
      this.resetForm();
    }
  }

  validateTransaction(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.newTransaction.creditCardId || this.newTransaction.creditCardId === 0) {
      this.errors['creditCardId'] = 'Please select a credit card';
      isValid = false;
    }

    if (!this.newTransaction.amount || this.newTransaction.amount <= 0) {
      this.errors['amount'] = 'Amount must be greater than 0';
      isValid = false;
    }

    if (!this.newTransaction.currency) {
      this.errors['currency'] = 'Currency is required';
      isValid = false;
    }

    if (!this.newTransaction.date) {
      this.errors['date'] = 'Date is required';
      isValid = false;
    }

    return isValid;
  }

  addTransaction(): void {
    if (!this.validateTransaction()) {
      return;
    }

    this.transactionService.createTransaction(this.newTransaction).subscribe({
      next: () => {
        this.loadTransactions();
        this.toggleAddForm();
      },
      error: (err) => {
        alert('Failed to add transaction');
        console.error('Error creating transaction:', err);
      }
    });
  }

  onTransactionDeleted(): void {
    this.loadTransactions();
  }

  resetForm(): void {
    this.newTransaction = {
      creditCardId: 0,
      amount: 0,
      currency: 'USD',
      comment: '',
      date: new Date().toISOString().split('T')[0]
    };
    this.errors = {};
  }
}
