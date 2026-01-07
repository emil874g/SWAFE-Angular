import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * ANGULAR MATERIAL EXPLAINED:
 *
 * WHY use Angular Material?
 * - Pre-built, accessible UI components
 * - Consistent Material Design styling
 * - Responsive and mobile-friendly
 * - Well-tested and maintained by Google
 *
 * HOW to use Angular Material:
 * 1. Install: ng add @angular/material
 * 2. Import component modules (e.g., MatButtonModule)
 * 3. Use components in templates (<mat-card>, <button mat-raised-button>)
 * 4. Customize with themes and colors
 */
@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './material-demo.component.html',
  styleUrl: './material-demo.component.scss'
})
export class MaterialDemoComponent {
  onButtonClick() {
    alert('Material button clicked!');
  }
}
