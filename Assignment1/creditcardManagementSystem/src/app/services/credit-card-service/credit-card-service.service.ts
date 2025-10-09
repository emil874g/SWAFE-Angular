import { Injectable, signal, computed } from '@angular/core';

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

  private creditCardsSignal = signal<CreditCard[]>([]);

  creditCards = computed(() => this.creditCardsSignal());

  addCreditCard(card: CreditCard): void {
    this.creditCardsSignal.update(cards => [...cards, card]);
  }

  removeCreditCard(id: string): void {
    this.creditCardsSignal.update(cards =>
      cards.filter(card => card.id !== id)
    );
  }

  getCreditCardById(id: string): CreditCard | undefined {
    return this.creditCardsSignal().find(card => card.id === id);
  }

  generateCardId(): string { // is this necessaryy?= idk yet, but I'll find out
    return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
