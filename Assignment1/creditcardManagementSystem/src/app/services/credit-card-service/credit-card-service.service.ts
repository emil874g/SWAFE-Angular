import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '../api/api.service';

export interface CreditCard {
    cardNumber: string;
    cardholderName: string;
    cscCode: string;
    expiryDateMonth: string;
    expiryDateYear: string;
    issuer: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private apiService = inject(ApiService);

  private creditCardsSignal = signal<CreditCard[]>([]);
  creditCards = computed(() => this.creditCardsSignal().filter(card => {
    const cardNumber = card.cardNumber || (card as any).card_number;
    return cardNumber && String(cardNumber).trim() !== '';
  }));

  loadCreditCards(): void {
    console.log('Loading credit cards from API...');
    this.apiService.getCreditCards()
      .subscribe({
        next: (cards) => {
          console.log('Received cards from API:', cards);
          this.creditCardsSignal.set(cards);
          console.log('Filtered cards:', this.creditCards());
        },
        error: (err) => console.error('Error loading cards:', err)
      });
  }

  addCreditCard(card: CreditCard): void {
    console.log('Adding credit card:', card);
    this.apiService.createCreditCard(card)
      .subscribe({
        next: (newCard) => {
          console.log('API returned new card:', newCard);
          // Reload all credit cards to ensure sync with server
          this.loadCreditCards();
        },
        error: (err) => console.error('Error adding card:', err)
      });
  }

  removeCreditCard(cardNumber: string): void {
    this.apiService.deleteCreditCard(cardNumber)
      .subscribe({
        next: () => {
          this.creditCardsSignal.update(cards => cards.filter(card => card.cardNumber !== cardNumber));
          console.log('Credit card deleted successfully');
        },
        error: (err: any) => {
          // If 404, the card was already deleted (shared API), still remove from local state
          if (err.status === 404) {
            this.creditCardsSignal.update(cards => cards.filter(card => card.cardNumber !== cardNumber));
            console.log('Credit card was already deleted, removed from local state');
          } else {
            console.error('Error removing card:', err);
          }
        }
      });
  }

  getCreditCardByNumber(cardNumber: string): CreditCard | undefined {
    return this.creditCardsSignal().find(card => card.cardNumber === cardNumber);
  }
}
