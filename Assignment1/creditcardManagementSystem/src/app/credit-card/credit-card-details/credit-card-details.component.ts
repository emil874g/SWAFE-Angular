import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreditCardService } from '../../shared/services/credit-card.service';
import { TransactionService } from '../../shared/services/transaction.service';
import { CreditCard } from '../../shared/models/credit-card.model';
import { Transaction } from '../../shared/models/transaction.model';
import { ExpirationDatePipe } from '../../shared/pipes/expiration-date.pipe';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [CommonModule, ExpirationDatePipe],
  templateUrl: './credit-card-details.component.html',
  styleUrl: './credit-card-details.component.scss'
})
export class CreditCardDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private creditCardService = inject(CreditCardService);
  private transactionService = inject(TransactionService);

  creditCard = signal<CreditCard | null>(null);
  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCreditCard(+id);
      this.loadTransactions(+id);
    }
  }

  loadCreditCard(id: number): void {
    this.creditCardService.getCreditCard(id).subscribe({
      next: (card) => {
        this.creditCard.set(card);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load credit card details');
        this.loading.set(false);
        console.error('Error loading credit card:', err);
      }
    });
  }

  loadTransactions(creditCardId: number): void {
    this.transactionService.getTransactionsByCreditCard(creditCardId).subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      }
    });
  }

  deleteCreditCard(): void {
    const card = this.creditCard();
    if (card && card.id && confirm('Are you sure you want to delete this credit card?')) {
      this.creditCardService.deleteCreditCard(card.id).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert('Failed to delete credit card');
          console.error('Error deleting credit card:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
