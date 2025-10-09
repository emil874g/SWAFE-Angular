import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction-service/transaction.service';
import { CreditCardService } from '../../services/credit-card-service/credit-card-service.service';

@Component({
    selector: 'app-transactions-overview',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './transactions-overview.component.html',
    styleUrl: './transactions-overview.component.scss'
})
export class TransactionsOverviewComponent {
    private transactionService = inject(TransactionService);
    private creditCardService = inject(CreditCardService);
    private router = inject(Router);

    // F5.1.4: Filter by card number
    filterCardNumber = signal<string>('');
    
    // F5.1: All transactions
    allTransactions = this.transactionService.transactions;
    
    // Filtered transactions based on card number
    filteredTransactions = computed(() => {
        const filter = this.filterCardNumber();
        if (!filter) return this.allTransactions();
        return this.allTransactions().filter(t => t.credit_card.includes(filter));
    });

    // F6.1.7: Remove transaction
    removeTransaction(id: string): void {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactionService.removeTransaction(id);
        }
    }

    // Get available credit cards for dropdown
    creditCards = this.creditCardService.creditCards;

    // F5.1.2: Navigate to add transaction
    addTransaction(): void {
        this.router.navigate(['/transactions/add']);
    }

    // F5.1.3 & F5.1.4: Update filter
    onFilterChange(cardNumber: string): void {
        this.filterCardNumber.set(cardNumber);
    }
}
