// product-detail.component.ts
// Q3: Demonstrates accessing route parameters

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  searchTerm: string = '';
  currentUrl: string = '';
  explanation: string = '';

  /**
   * ActivatedRoute: Injected to access route information
   * Router: Injected for navigation
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Method 1: Snapshot (for one-time read)
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') || '';
    this.currentUrl = this.router.url;

    // Method 2: Observable (for reactive updates)
    // Use this if the component stays mounted while parameters change
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Route parameter changed:', id);
    });

    this.explanation = `
// 1. Route Parameters (from path: '/product/:id')
this.route.snapshot.paramMap.get('id')

// 2. Query Parameters (from ?search=term)
this.route.snapshot.queryParamMap.get('search')

// 3. Observable for reactive updates
this.route.paramMap.subscribe(params => {
  const id = params.get('id');
})
    `.trim();
  }

  goBack(): void {
    this.router.navigate(['/q3']);
  }

  goToProduct(id: number): void {
    // Navigate to another product
    this.router.navigate(['/q3/product', id], {
      queryParams: { search: this.searchTerm }
    });
  }
}

/**
 * Accessing Route Information:
 *
 * ActivatedRoute provides:
 * - paramMap: Route parameters (/product/:id)
 * - queryParamMap: Query parameters (?key=value)
 * - data: Static route data
 * - url: URL segments
 * - fragment: URL fragment (#section)
 *
 * Two ways to access:
 * 1. Snapshot: One-time read (good for initial load)
 * 2. Observable: Reactive updates (if params change while component is active)
 */
