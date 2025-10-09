import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction-service/transaction.service';
import { CreditCardService } from '../../services/credit-card-service/credit-card-service.service';

@Component({
    selector: 'app-add-transaction',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './add-transaction.component.html',
    styleUrl: './add-transaction.component.scss'
})
export class AddTransactionComponent {
    private formBuilder = inject(FormBuilder);
    private transactionService = inject(TransactionService);
    private creditCardService = inject(CreditCardService);
    private router = inject(Router);

    transactionForm: FormGroup;
    submitted = false;

    creditCards = this.creditCardService.creditCards;
    currencies = ['USD', 'EUR', 'DKK', 'GBP', 'JPY', 'WON'];

    // Reactive forms + validation again, just like in credit card component
    constructor() {
        this.transactionForm = this.formBuilder.group({
            credit_card: ['', Validators.required], 
            amount: ['', [Validators.required, Validators.min(0.01)]],
            currency: ['', Validators.required],
            date: ['', Validators.required],
            comment: ['']
        });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.transactionForm.valid) {
            const newTransaction = {
                id: '', 
                ...this.transactionForm.value
            };
            this.transactionService.addTransaction(newTransaction);
            this.router.navigate(['/transactions']);
        }
    }

    onCancel(): void {
        this.router.navigate(['/transactions']);
    }

    showError(field: string): boolean {
        const control = this.transactionForm.get(field);
        return !!(control?.invalid && (control?.touched || this.submitted));
    }
}
