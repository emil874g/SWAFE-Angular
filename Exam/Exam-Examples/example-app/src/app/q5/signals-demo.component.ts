import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  template: `
    <p>Count: {{ count() }}</p>
    <button type="button" (click)="increment()">Increment</button>
    <p>Double: {{ doubleCount() }}</p>
  `,
})
export class SignalsDemoComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}
