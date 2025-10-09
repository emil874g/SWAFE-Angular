import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardService } from '../../services/credit-card-service/credit-card-service.service';

@Component({
    selector: 'credit-card-list',
    standalone: true,
    imports: [],
    templateUrl: './credit-card-list.component.html',
    styleUrl: './credit-card-list.component.scss'
})
export class CreditCardListComponent {
    private router = inject(Router);
    private creditCardService = inject(CreditCardService);

    // using signals to auto update the list when a new card is added
    creditCards = this.creditCardService.creditCards;

    navigateToDetails(cardNumber: string): void {
        this.router.navigate(['/credit-card', cardNumber]);
    }
}
