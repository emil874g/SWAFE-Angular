import { Component, OnInit, inject, signal } from '@angular/core';
import { CreditCardListComponent } from '../credit-card/credit-card-list/credit-card-list.component';
import { CreditCardService } from '../shared/services/credit-card.service';
import { CreditCard } from '../shared/models/credit-card.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreditCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  creditCardService = inject(CreditCardService);
  creditCards = signal<CreditCard[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.loadCreditCards();
  }

  loadCreditCards(): void {
    this.loading.set(true);
    this.creditCardService.getCreditCards().subscribe({
      next: (cards) => {
        this.creditCards.set(cards);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load credit cards');
        this.loading.set(false);
        console.error('Error loading credit cards:', err);
      }
    });
  }
}
