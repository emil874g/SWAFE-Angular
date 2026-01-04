import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'Angular PWA Demo';
  counter = signal(0);

  increment(): void {
    this.counter.update(v => v + 1);
  }

  decrement(): void {
    this.counter.update(v => v - 1);
  }

  reset(): void {
    this.counter.set(0);
  }
}

