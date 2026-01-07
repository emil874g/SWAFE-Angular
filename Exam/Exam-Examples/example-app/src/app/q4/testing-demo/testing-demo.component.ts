// testing-demo.component.ts
// Q4: Simple component for testing demonstration

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testing-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testing-demo.component.html',
  styleUrls: ['./testing-demo.component.scss']
})
export class TestingDemoComponent {
  title = 'Testing Demo';
  count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  reset(): void {
    this.count = 0;
  }

  add(a: number, b: number): number {
    return a + b;
  }

  isEven(num: number): boolean {
    return num % 2 === 0;
  }
}
