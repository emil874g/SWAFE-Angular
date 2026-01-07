import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Q1, Q2, Q4, Q5 - Client-side rendering only
  {
    path: 'q1',
    renderMode: RenderMode.Client
  },
  {
    path: 'q2',
    renderMode: RenderMode.Client
  },
  {
    path: 'q4',
    renderMode: RenderMode.Client
  },
  {
    path: 'q5',
    renderMode: RenderMode.Client
  },
  // Q3 - Server-side rendering (for SSR demo)
  {
    path: 'q3/**',
    renderMode: RenderMode.Server
  },
  // Default - CSR
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
