import { Component } from '@angular/core';
import { SignalsDemoComponent } from './signals-demo.component';
import { MaterialDemoComponent } from './material-demo.component';

@Component({
  selector: 'app-q5-page',
  standalone: true,
  imports: [SignalsDemoComponent, MaterialDemoComponent],
  template: `
    <h2>Question 5 – Signals & Styling</h2>

    <section class="q5-layout">
      <div class="q5-panel">
        <h3>Signals demo</h3>
        <app-signals-demo></app-signals-demo>
      </div>

      <div class="q5-panel">
        <h3>Angular Material + responsive layout</h3>
        <app-material-demo></app-material-demo>
      </div>
    </section>
  `,
  styles: [`
    .q5-layout {
      display: flex;
      gap: 1rem;
    }
    .q5-panel {
      flex: 1;
      border: 1px solid #ccc;
      padding: 1rem;
    }
    @media (max-width: 700px) {
      .q5-layout {
        flex-direction: column;
      }
    }
  `],
})
export class Q5PageComponent {}
