import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatCardModule],
  template: `
    <mat-toolbar color="primary">
      <span>Material demo</span>
    </mat-toolbar>

    <div class="cards">
      <mat-card>
        <mat-card-title>Responsive card</mat-card-title>
        <mat-card-content>
          <p>Angular Material component with CSS Grid layout.</p>
        </mat-card-content>
        <button mat-raised-button color="accent">Action</button>
      </mat-card>
    </div>
  `,
  styles: [`
    .cards {
      margin-top: 1rem;
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  `],
})
export class MaterialDemoComponent {}
