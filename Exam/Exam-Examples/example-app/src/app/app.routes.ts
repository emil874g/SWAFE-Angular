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

  // Q1 – Angular basics, DI, components, communication
  { path: 'q1', component: Q1PageComponent },

  // Q2 – Reactive programming, RxJS, HttpClient
  { path: 'q2', component: Q2PageComponent },

  // Q3 – Routing + SSR
  { path: 'q3', component: Q3PageComponent },

  // Q4 – Forms + testing
  { path: 'q4', component: Q4PageComponent },

  // Q5 – Signals + styling
  { path: 'q5', component: Q5PageComponent },

  // Q3: example lazy-loaded route (standalone feature component)
  {
    path: 'lazy-users',
    loadComponent: () =>
      import('./q3/lazy-users-page.component').then(m => m.LazyUsersPageComponent),
  },

  // Q3: wildcard
  { path: '**', redirectTo: 'q1' },
];
