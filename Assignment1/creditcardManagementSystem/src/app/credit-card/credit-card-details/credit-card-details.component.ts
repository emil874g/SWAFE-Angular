import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CreditCard {
    id: string;
    card_number: string;
    cardholder_name: string;
    csc_code: string;
    expiry_date_month: string;
    expiry_date_year: string;
    issuer: string;
}

@Component({
    selector: 'app-credit-card-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './credit-card-details.component.html',
    styleUrl: './credit-card-details.component.scss'
})
export class CreditCardDetailsComponent implements OnInit {
    cardId: string | null = null;
    creditCard: CreditCard | null = null;

    // Mock data
    private creditCards: CreditCard[] = [
        {id: '1', card_number: '1234 5678 9012 3456', cardholder_name: 'Emil Lydersen', csc_code: '123', issuer: 'Visa', expiry_date_month: '12', expiry_date_year: '25' },
        {id: '2', card_number: '9876 5432 1098 7654', cardholder_name: 'Oliver Kok', csc_code: '456', issuer: 'MasterCard', expiry_date_month: '08', expiry_date_year: '26' },
        {id: '3', card_number: '4567 8901 2345 6789', cardholder_name: 'Simon Dybdahl Damulog Andersen', csc_code: '789', issuer: 'Visa', expiry_date_month: '03', expiry_date_year: '27' },
        {id: '4', card_number: '3210 6543 2109 8765', cardholder_name: 'Camilla Jørgsen', csc_code: '321', issuer: 'Danske Bank', expiry_date_month: '06', expiry_date_year: '25' }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Get the card ID from the route parameter
        this.cardId = this.route.snapshot.paramMap.get('id');
        
        // Find the credit card with matching ID
        if (this.cardId) {
            this.creditCard = this.creditCards.find(card => card.id === this.cardId) || null;
        }
    }

    goBack(): void {
        this.router.navigate(['/home']);
    }
}
