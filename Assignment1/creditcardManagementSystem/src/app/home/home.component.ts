import { Component } from '@angular/core';
import { CreditCardListComponent } from '../credit-card/credit-card-list/credit-card-list.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CreditCardListComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
}
