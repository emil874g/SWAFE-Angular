import { Component, OnInit, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CreditCardService } from '../../services/credit-card-service/credit-card-service.service';
import { TransactionsListComponent } from "../../transactions/transactions-list/transactions-list.component";
import { ExpiryDatePipe } from '../../pipes/expiry-date.pipe';

@Component({
    selector: 'app-credit-card-details',
    standalone: true,
    imports: [TransactionsListComponent, ExpiryDatePipe],
    templateUrl: './credit-card-details.component.html',
    styleUrl: './credit-card-details.component.scss'
})
export class CreditCardDetailsComponent implements OnInit {
    // Use inject() function instead of constructor injection
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private creditCardService = inject(CreditCardService);

    cardNumber: string | null = null;

    // Use computed signal to reactively get the card from the service
    creditCard = computed(() => {
        if (!this.cardNumber) return null;
        return this.creditCardService.getCreditCardByNumber(this.cardNumber);
    });

    ngOnInit(): void {
        // Get the card number from the route parameter
        this.cardNumber = this.route.snapshot.paramMap.get('cardNumber');
    }

    deleteCard(): void {
        const card = this.creditCard();
        if (card && confirm('Are you sure you want to delete this credit card?')) {
            this.creditCardService.removeCreditCard(card.cardNumber);
            this.goBack();
        }
    }

    goBack(): void {
        this.router.navigate(['/home']);
    }
}
