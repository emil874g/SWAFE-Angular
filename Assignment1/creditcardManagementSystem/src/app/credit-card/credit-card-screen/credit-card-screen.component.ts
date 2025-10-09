import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreditCardService } from '../../services/credit-card-service/credit-card-service.service';

@Component({
    selector: 'app-credit-card-screen',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './credit-card-screen.component.html',
    styleUrl: './credit-card-screen.component.scss'
})
export class CreditCardScreenComponent {
    // Use inject() for all dependencies
    private fb = inject(FormBuilder);
    private creditCardService = inject(CreditCardService);
    private router = inject(Router);

    creditCardForm: FormGroup;
    submitted = false;

    issuers = ['Visa', 'MasterCard', 'American Express', 'Danske Bank', 'Nordea', 'Discover'];

    constructor() {
        this.creditCardForm = this.fb.group({
            // F4.1: card_number - only integers, 7-16 digits, required
            card_number: ['', [
                Validators.required,  // F4.1.3
                Validators.pattern(/^\d{7,16}$/),  // F4.1.1 & F4.1.2
            ]],
            // F4.3: cardholder_name - required
            cardholder_name: ['', [
                Validators.required,  // F4.3.1
                Validators.minLength(2)
            ]],
            // F4.2: csc_code - only integers, exactly 3 digits, required
            csc_code: ['', [
                Validators.required,  // F4.2.4
                Validators.pattern(/^\d{3}$/),  // F4.2.1 & F4.2.2
            ]],
            // F4.4: expiration_date_month - range 1-12, required
            expiry_date_month: ['', [
                Validators.required,  // F4.4.2
                Validators.min(1),  // F4.4.1
                Validators.max(12)  // F4.4.1
            ]],
            // F4.5: expiration_date_year - required
            expiry_date_year: ['', [
                Validators.required  // F4.5.1
            ]],
            issuer: ['', Validators.required]
        });
    }

    // Only allow numbers for card number input
    onCardNumberInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        // Remove any non-digit characters
        input.value = input.value.replace(/\D/g, '');
        this.creditCardForm.patchValue({ card_number: input.value });
    }

    // Only allow numbers for CSC input
    onCscInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        // Remove any non-digit characters and limit to 3 digits
        input.value = input.value.replace(/\D/g, '').substring(0, 3);
        this.creditCardForm.patchValue({ csc_code: input.value });
    }

    // Only allow numbers for month input
    onMonthInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/\D/g, '');
        this.creditCardForm.patchValue({ expiry_date_month: input.value });
    }

    // Only allow numbers for year input
    onYearInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/\D/g, '');
        this.creditCardForm.patchValue({ expiry_date_year: input.value });
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.creditCardForm.valid) {
            const newCard = {
                id: this.creditCardService.generateCardId(),
                ...this.creditCardForm.value
            };
            
            this.creditCardService.addCreditCard(newCard);
            this.router.navigate(['/home']);
        }
    }

    onCancel(): void {
        this.router.navigate(['/home']);
    }

    // Helper methods for template
    get f() { return this.creditCardForm.controls; }

    hasError(controlName: string): boolean {
        const control = this.creditCardForm.get(controlName);
        return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
    }

    getErrorMessage(controlName: string): string {
        const control = this.creditCardForm.get(controlName);
        if (!control || !control.errors) return '';

        switch (controlName) {
            case 'card_number':
                if (control.errors['required']) return 'Card number is required (F4.1.3)';
                if (control.errors['pattern']) return 'Card number must be 7-16 digits (F4.1.1, F4.1.2)';
                break;
            case 'cardholder_name':
                if (control.errors['required']) return 'Cardholder name is required (F4.3.1)';
                if (control.errors['minlength']) return 'Name must be at least 2 characters';
                break;
            case 'csc_code':
                if (control.errors['required']) return 'CSC code is required (F4.2.4)';
                if (control.errors['pattern']) return 'CSC must be exactly 3 digits (F4.2.1, F4.2.2)';
                break;
            case 'expiry_date_month':
                if (control.errors['required']) return 'Expiry month is required (F4.4.2)';
                if (control.errors['min'] || control.errors['max']) return 'Month must be between 1-12 (F4.4.1)';
                break;
            case 'expiry_date_year':
                if (control.errors['required']) return 'Expiry year is required (F4.5.1)';
                break;
            case 'issuer':
                if (control.errors['required']) return 'Issuer is required';
                break;
        }
        return '';
    }
}
