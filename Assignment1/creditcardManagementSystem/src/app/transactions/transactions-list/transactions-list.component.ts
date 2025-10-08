import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../shared/models/transaction.model';
import { TransactionService } from '../../shared/services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() transactionDeleted = new EventEmitter<void>();

  private transactionService = inject(TransactionService);

  deleteTransaction(id: number | undefined): void {
    if (id && confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => {
          this.transactionDeleted.emit();
        },
        error: (err) => {
          alert('Failed to delete transaction');
          console.error('Error deleting transaction:', err);
        }
      });
    }
  }
}
