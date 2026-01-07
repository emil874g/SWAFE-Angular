// lazy-feature.component.ts
// Q3: Component in lazy-loaded module

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-feature.component.html',
  styleUrls: ['./lazy-feature.component.scss']
})
export class LazyFeatureComponent {
  lazyLoadingExample = `{
  path: 'lazy',
  loadComponent: () => import('./lazy-feature.component')
    .then(m => m.LazyFeatureComponent)
}`.trim();
}

/**
 * Lazy Loading in Angular:
 *
 * Benefits:
 * - Reduces initial bundle size
 * - Improves initial load time
 * - Code-splitting: Load features on demand
 *
 * Methods:
 * 1. Lazy-load component:
 *    loadComponent: () => import('./component').then(m => m.Component)
 *
 * 2. Lazy-load module (older approach):
 *    loadChildren: () => import('./module').then(m => m.Module)
 *
 * When to use:
 * - Large features not needed on initial load
 * - Admin panels
 * - Reports/analytics
 * - Secondary features
 */
