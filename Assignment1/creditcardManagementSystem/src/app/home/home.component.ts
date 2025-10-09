import { Component, OnInit, inject } from '@angular/core';
import { CreditCardListComponent } from '../credit-card/credit-card-list/credit-card-list.component';
import { CreditCardService } from '../services/credit-card-service/credit-card-service.service';
import { TransactionService } from '../services/transaction-service/transaction.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CreditCardListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private creditCardService = inject(CreditCardService);
  private transactionService = inject(TransactionService);

  ngOnInit(): void {
    // Load data from API on app start
    this.creditCardService.loadCreditCards();
    this.transactionService.loadTransactions();
  }
}
