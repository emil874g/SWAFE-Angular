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

    filterCardNumber = signal<string>('');
    allTransactions = this.transactionService.transactions;


    filteredTransactions = computed(() => {
        const filter = this.filterCardNumber();
        if (!filter) return this.allTransactions();
        return this.allTransactions().filter(t => t.creditCard.includes(filter));
    });

    removeTransaction(id: string): void {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactionService.removeTransaction(id);
        }
    }

    creditCards = this.creditCardService.creditCards;
    addTransaction(): void {
        this.router.navigate(['/transactions/add']);
    }


    onFilterChange(cardNumber: string): void {
        this.filterCardNumber.set(cardNumber);
    }
}
