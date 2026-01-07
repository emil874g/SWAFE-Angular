import { Component, signal, computed, effect } from '@angular/core';

/**
 * SIGNALS EXPLAINED:
 *
 * WHY use signals?
 * - Better performance: Change detection only runs where needed
 * - Simpler than RxJS for local state
 * - Fine-grained reactivity
 * - Less boilerplate than traditional observables
 *
 * HOW to use signals:
 * 1. signal() - Creates a writable signal
 * 2. computed() - Derives values from other signals
 * 3. effect() - Runs side effects when signals change
 */
@Component({
  selector: 'app-signals-demo',
  standalone: true,
  templateUrl: './signals-demo.component.html',
  styleUrl: './signals-demo.component.scss'
})
export class SignalsDemoComponent {
  // Basic writable signal
  count = signal(0);

  // Computed signal - automatically updates when count changes
  doubleCount = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);

  // Effect - runs side effects when signals change
  constructor() {
    effect(() => {
      console.log(`Count changed to: ${this.count()}`);
    });
  }

  increment() {
    // Update signal value
    this.count.update(c => c + 1);
  }

  decrement() {
    this.count.update(c => c - 1);
  }

  reset() {
    // Set signal to a specific value
    this.count.set(0);
  }
}
