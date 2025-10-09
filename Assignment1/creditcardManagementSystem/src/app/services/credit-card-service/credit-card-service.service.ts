import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from '../api/api.service';

export interface CreditCard {
    id: string;
    card_number: string;
    cardholder_name: string;
    csc_code: string;
    expiry_date_month: string;
    expiry_date_year: string;
    issuer: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private apiService = inject(ApiService);

  private creditCardsSignal = signal<CreditCard[]>([]);
  creditCards = computed(() => this.creditCardsSignal());

  loadCreditCards(): void {
    this.apiService.getCreditCards()
      .subscribe({
        next: (cards) => this.creditCardsSignal.set(cards),
        error: (err) => console.error('Error loading cards:', err)
      });
  }

  addCreditCard(card: CreditCard): void {
    this.apiService.createCreditCard(card)
      .subscribe({
        next: (newCard) => this.creditCardsSignal.update(cards => [...cards, newCard]),
        error: (err) => console.error('Error adding card:', err)
      });
  }

  removeCreditCard(cardNumber: string): void {
    this.apiService.deleteCreditCard(cardNumber)
      .subscribe({
        next: () => this.creditCardsSignal.update(cards => cards.filter(card => card.card_number !== cardNumber)),
        error: (err) => console.error('Error removing card:', err)
      });
  }

  getCreditCardById(id: string): CreditCard | undefined {
    return this.creditCardsSignal().find(card => card.id === id);
  }

  getCreditCardByNumber(cardNumber: string): CreditCard | undefined {
    return this.creditCardsSignal().find(card => card.card_number === cardNumber);
  }
}
