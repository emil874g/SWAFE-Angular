import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction-service/transaction.service';

@Component({
    selector: 'transactions-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transactions-list.component.html',
    styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent {
    @Input() cardNumber?: string;

    private transactionService = inject(TransactionService);

    // F3.4: Get transactions for specific card
    transactions = computed(() => {
        if (!this.cardNumber) return [];
        return this.transactionService.getTransactionsByCardNumber(this.cardNumber);
    });

    // F6.1.7: Remove transaction
    removeTransaction(id: string): void {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactionService.removeTransaction(id);
        }
    }
}
