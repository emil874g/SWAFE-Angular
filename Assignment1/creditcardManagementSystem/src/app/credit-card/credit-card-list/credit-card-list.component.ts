import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface CreditCard {
    id: string;
    card_number: string;
    cardholder_name: string;
    issuer: string;
}

@Component({
    selector: 'credit-card-list',
    standalone: true,
    imports: [],
    templateUrl: './credit-card-list.component.html',
    styleUrl: './credit-card-list.component.scss'
})
export class CreditCardListComponent {
    creditCards: CreditCard[] = [
        { id: '1', card_number: '1234 5678 9012 3456', cardholder_name: 'Emil Lydersen', issuer: 'Visa' },
        { id: '2', card_number: '9876 5432 1098 7654', cardholder_name: 'Oliver Kok', issuer: 'MasterCard' },
        { id: '3', card_number: '4567 8901 2345 6789', cardholder_name: 'Simon Dybdahl Damulog Andersen', issuer: 'Visa' },
        { id: '4', card_number: '3210 6543 2109 8765', cardholder_name: 'Camilla Jørgsen', issuer: 'Danske Bank' }
    ];

    constructor(private router: Router) {}

    navigateToDetails(cardId: string): void {
        this.router.navigate(['/credit-card', cardId]);
    }
}
