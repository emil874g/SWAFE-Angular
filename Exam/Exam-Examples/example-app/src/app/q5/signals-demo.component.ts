import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signals-demo',
  standalone: true,
  templateUrl: './signals-demo.component.html',
  styleUrl: './signals-demo.component.scss'
})
export class SignalsDemoComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}
