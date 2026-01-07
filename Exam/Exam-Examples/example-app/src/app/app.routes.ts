// app.routes.ts
// Q3: Route configuration for all question pages.

import { Routes } from '@angular/router';

// Import standalone pages for each question
import { Q1PageComponent } from './q1/q1-page.component';
import { Q2PageComponent } from './q2/q2-page.component';
import { Q3PageComponent } from './q3/q3-page.component';
import { Q4PageComponent } from './q4/q4-page.component';
import { Q5PageComponent } from './q5/q5-page.component';

// Lazy-loaded example for Q3 (could be a separate feature)
export const routes: Routes = [
  { path: '', redirectTo: 'q1', pathMatch: 'full' },

  // Q1 – Angular basics, DI, components, communication (CSR only)
  { path: 'q1', component: Q1PageComponent },

  // Q2 – Reactive programming, RxJS, HttpClient (CSR only)
  { path: 'q2', component: Q2PageComponent },

  // Q3 – Routing + SSR (SSR enabled!)
  {
    path: 'q3',
    component: Q3PageComponent,
    children: [
      // Child routes for Q3 demos
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./q3/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      },
      {
        path: 'lazy',
        loadComponent: () =>
          import('./q3/lazy-feature/lazy-feature.component').then(m => m.LazyFeatureComponent)
      },
      {
        path: 'protected',
        loadComponent: () =>
          import('./q3/protected/protected.component').then(m => m.ProtectedComponent),
        canActivate: [() => {
          // Inline guard for simplicity
          const allow = Math.random() > 0.5;
          if (!allow) {
            alert('Access denied by guard! (Random for demo)');
          }
          return allow;
        }]
      }
    ]
  },

  // Q4 – Forms + testing (CSR only)
  { path: 'q4', component: Q4PageComponent },

  // Q5 – Signals + styling (CSR only)
  { path: 'q5', component: Q5PageComponent },

  // Wildcard - redirect to Q1
  { path: '**', redirectTo: 'q1' },
];
