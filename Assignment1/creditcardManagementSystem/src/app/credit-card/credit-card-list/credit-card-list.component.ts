import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreditCard } from '../../shared/models/credit-card.model';

@Component({
  selector: 'app-credit-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card-list.component.html',
  styleUrl: './credit-card-list.component.scss'
})
export class CreditCardListComponent {
  @Input() creditCards: CreditCard[] = [];

  constructor(private router: Router) {}

  navigateToDetails(cardId: number | undefined): void {
    if (cardId) {
      this.router.navigate(['/credit-card', cardId]);
    }
  }
}
