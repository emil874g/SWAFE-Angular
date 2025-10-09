import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CreditCardService } from '../../services/credit-card-service/credit-card-service.service';

@Component({
    selector: 'app-credit-card-screen',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './credit-card-screen.component.html',
    styleUrl: './credit-card-screen.component.scss'
})
export class CreditCardScreenComponent {
    // Use inject() for all dependencies
    private formBuilder = inject(FormBuilder);
    private creditCardService = inject(CreditCardService);
    private router = inject(Router);

    creditCardForm: FormGroup;
    submitted = false;

    // Issuer could prolly be input by the user? but will keep it hardcoded for now
    issuers = ['Visa', 'MasterCard', 'American Express', 'Danske Bank', 'Nordea'];

    // Error messages
    private errorMessages: { [key: string]: { [key: string]: string } } = {
        card_number: {
            required: 'Card number is required ',
            pattern: 'Card number must be 7-16 digits'
        },
        csc_code: {
            required: 'CSC code is required',
            pattern: 'CSC must be exactly 3 digits'
        },
        cardholder_name: {
            required: 'Cardholder name is required',
            minlength: 'Name must be at least 2 characters'
        },
        expiry_date_month: {
            required: 'Month is required',
            min: 'Month must be between 1-12',
            max: 'Month must be between 1-12'
        },
        expiry_date_year: {
            required: 'Year is required'
        },
        issuer: {
            required: 'Issuer is required'
        }
    };

    //validator reactive form from BS slides
    constructor() {
        this.creditCardForm = this.formBuilder.group({
            card_number: ['', [Validators.required, Validators.pattern(/^\d{7,16}$/)]], // yea I use cursed REGEX but tha shi works really well
            cardholder_name: ['', [Validators.required, Validators.minLength(2)]],
            csc_code: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], // also here
            expiry_date_month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
            expiry_date_year: ['', [Validators.required]],
            issuer: ['', Validators.required]
        });
    }

    // one method for all digit inputs, instead of one for each input field 
    onDigitInput(event: Event, fieldName: string, maxLength?: number): void {
        const input = event.target as HTMLInputElement;
        let value = input.value.replace(/\D/g, ''); // Remove non-digit characters regex stuff
        if (maxLength) value = value.substring(0, maxLength);
        input.value = value;
        this.creditCardForm.patchValue({ [fieldName]: value });
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.creditCardForm.valid) {
            const newCard = {
                id: '', // API will generate the ID
                ...this.creditCardForm.value
            };
            this.creditCardService.addCreditCard(newCard);
            this.router.navigate(['/home']);
        }
    }

    onCancel(): void {
        this.router.navigate(['/home']);
    }

    showError(fieldName: string): boolean {
        const field = this.creditCardForm.get(fieldName);
        return !!(field?.invalid && (field?.touched || this.submitted));
    }

    getError(fieldName: string): string {
        const field = this.creditCardForm.get(fieldName);
        if (!field?.errors) return '';
        const firstError = Object.keys(field.errors)[0];
        return this.errorMessages[fieldName]?.[firstError] || 'Invalid input';
    }
}