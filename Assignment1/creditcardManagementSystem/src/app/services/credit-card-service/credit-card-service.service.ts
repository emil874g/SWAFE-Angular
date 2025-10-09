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
  
  cardCount = computed(() => this.creditCardsSignal().length);
  
  hasCards = computed(() => this.creditCardsSignal().length > 0);

  addCreditCard(card: CreditCard): void {
    // I dont actually understand what signals do yet
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

  generateCardId(): string {
    return `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Optional: Method to clear all cards
  // clearAllCards(): void {
  //   this.creditCardsSignal.set([]);
  // }

  // Optional: Method to update an existing card
  // updateCreditCard(id: string, updatedCard: Partial<CreditCard>): void {
  //   this.creditCardsSignal.update(cards =>
  //     cards.map(card => 
  //       card.id === id ? { ...card, ...updatedCard } : card
  //     )
  //   );
  // }
}