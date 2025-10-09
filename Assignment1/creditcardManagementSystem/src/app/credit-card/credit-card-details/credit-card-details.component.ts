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

    cardId: string | null = null;
    
    // Use computed signal to reactively get the card from the service
    creditCard = computed(() => {
        if (!this.cardId) return null;
        return this.creditCardService.getCreditCardById(this.cardId);
    });

    ngOnInit(): void {
        // Get the card ID from the route parameter
        this.cardId = this.route.snapshot.paramMap.get('id');
    }

    deleteCard(): void {
        const card = this.creditCard();
        if (card && confirm('Are you sure you want to delete this credit card?')) {
            this.creditCardService.removeCreditCard(card.card_number);
            this.goBack();
        }
    }

    goBack(): void {
        this.router.navigate(['/home']);
    }
}
