// app.component.ts
// Root component: navigation for Q1–Q5 and router outlet.

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="app-header">
      <h1>Angular Exam Demo</h1>
      <nav>
        <!-- Q3: navigation using routerLink -->
        <a routerLink="/q1" routerLinkActive="active">Q1 - Angular basics</a>
        <a routerLink="/q2" routerLinkActive="active">Q2 - Reactive & HTTP</a>
        <a routerLink="/q3" routerLinkActive="active">Q3 - Routing & SSR</a>
        <a routerLink="/q4" routerLinkActive="active">Q4 - Forms & Testing</a>
        <a routerLink="/q5" routerLinkActive="active">Q5 - Signals & Styling</a>
      </nav>
    </header>

    <main class="app-main">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class App {}
