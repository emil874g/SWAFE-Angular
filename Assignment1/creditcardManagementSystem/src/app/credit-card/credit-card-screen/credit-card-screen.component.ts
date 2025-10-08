import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreditCardService } from '../../shared/services/credit-card.service';
import { CreditCard } from '../../shared/models/credit-card.model';

@Component({
  selector: 'app-credit-card-screen',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './credit-card-screen.component.html',
  styleUrl: './credit-card-screen.component.scss'
})
export class CreditCardScreenComponent {
  private creditCardService = inject(CreditCardService);
  private router = inject(Router);

  creditCard: CreditCard = {
    card_number: '',
    cardholder_name: '',
    csc_code: '',
    expiration_date_month: 1,
    expiration_date_year: new Date().getFullYear(),
    issuer: ''
  };

  errors: { [key: string]: string } = {};
  isSubmitting = false;

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    // Card number validation
    if (!this.creditCard.card_number) {
      this.errors['card_number'] = 'Card number is required';
      isValid = false;
    } else if (!/^\d+$/.test(this.creditCard.card_number)) {
      this.errors['card_number'] = 'Card number must contain only digits';
      isValid = false;
    } else if (this.creditCard.card_number.length < 7 || this.creditCard.card_number.length > 16) {
      this.errors['card_number'] = 'Card number must be 7-16 digits';
      isValid = false;
    }

    // CSC code validation
    if (!this.creditCard.csc_code) {
      this.errors['csc_code'] = 'CSC code is required';
      isValid = false;
    } else if (!/^\d{3}$/.test(this.creditCard.csc_code)) {
      this.errors['csc_code'] = 'CSC code must be exactly 3 digits';
      isValid = false;
    }

    // Cardholder name validation
    if (!this.creditCard.cardholder_name || !this.creditCard.cardholder_name.trim()) {
      this.errors['cardholder_name'] = 'Cardholder name is required';
      isValid = false;
    }

    // Expiration month validation
    if (!this.creditCard.expiration_date_month || 
        this.creditCard.expiration_date_month < 1 || 
        this.creditCard.expiration_date_month > 12) {
      this.errors['expiration_date_month'] = 'Month must be between 1-12';
      isValid = false;
    }

    // Expiration year validation
    if (!this.creditCard.expiration_date_year) {
      this.errors['expiration_date_year'] = 'Expiration year is required';
      isValid = false;
    }

    // Issuer validation
    if (!this.creditCard.issuer || !this.creditCard.issuer.trim()) {
      this.errors['issuer'] = 'Issuer is required';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.creditCardService.createCreditCard(this.creditCard).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isSubmitting = false;
        alert('Failed to add credit card. Please try again.');
        console.error('Error creating credit card:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
