import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * RESPONSIVE WEB DESIGN EXPLAINED:
 *
 * FLEXBOX:
 * - One-dimensional layout (row or column)
 * - Great for navigation bars, button groups, card layouts
 * - Use: display: flex, flex-direction, justify-content, align-items
 *
 * CSS GRID:
 * - Two-dimensional layout (rows and columns)
 * - Perfect for page layouts, image galleries
 * - Use: display: grid, grid-template-columns, gap
 *
 * MEDIA QUERIES (MOBILE FIRST):
 * - Start with mobile styles as default
 * - Use min-width to progressively enhance for larger screens
 * - Common breakpoints: 768px (tablet), 1024px (desktop)
 * - Use: @media (min-width: 768px) { ... }
 * - Why? Most users are mobile, easier to add than remove complexity
 */
@Component({
  selector: 'app-responsive-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './responsive-demo.component.html',
  styleUrl: './responsive-demo.component.scss'
})
export class ResponsiveDemoComponent {
  items = [1, 2, 3, 4, 5, 6];
}
