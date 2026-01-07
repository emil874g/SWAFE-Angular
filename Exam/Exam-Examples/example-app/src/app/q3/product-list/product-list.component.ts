// product-list.component.ts
// Q3: Simple component to demonstrate routing navigation

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products: Product[] = [
    { id: 1, name: 'Angular Book', price: 29.99 },
    { id: 2, name: 'TypeScript Guide', price: 24.99 },
    { id: 3, name: 'RxJS Handbook', price: 34.99 }
  ];

  constructor(private router: Router) {}

  /**
   * Programmatic Navigation
   * Navigate to product detail using Router service
   */
  viewProduct(id: number): void {
    // Navigate with route parameters
    this.router.navigate(['/q3/product', id]);
  }
}

/**
 * Navigation Methods:
 *
 * 1. RouterLink (in template):
 *    <a [routerLink]="['/path', param]">Link</a>
 *
 * 2. Router.navigate() (programmatic):
 *    this.router.navigate(['/path', param])
 *
 * 3. Router.navigateByUrl():
 *    this.router.navigateByUrl('/path')
 */
