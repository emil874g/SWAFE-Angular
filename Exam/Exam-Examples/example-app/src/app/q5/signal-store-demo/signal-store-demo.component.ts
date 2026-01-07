import { Component, inject } from '@angular/core';
import { TodoStore } from './todo.store';
import { CommonModule } from '@angular/common';

/**
 * NGRX SIGNALSTORE EXPLAINED:
 *
 * WHY use SignalStore?
 * - Centralized state management with signals
 * - Less boilerplate than traditional NgRx Store
 * - Built-in methods for common patterns
 * - Type-safe state management
 *
 * HOW to use SignalStore:
 * 1. Create a store with signalStore()
 * 2. Define state with withState()
 * 3. Add methods with withMethods()
 * 4. Inject the store in components
 */
@Component({
  selector: 'app-signal-store-demo',
  standalone: true,
  imports: [CommonModule],
  providers: [TodoStore],
  templateUrl: './signal-store-demo.component.html',
  styleUrl: './signal-store-demo.component.scss'
})
export class SignalStoreDemoComponent {
  readonly store = inject(TodoStore);
  newTodo = '';

  addTodo() {
    if (this.newTodo.trim()) {
      this.store.addTodo(this.newTodo.trim());
      this.newTodo = '';
    }
  }

  onInputChange(event: Event) {
    this.newTodo = (event.target as HTMLInputElement).value;
  }
}
