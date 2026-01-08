// observable-demo.component.ts
// Q2: Super Simple Observable Example

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiService, User } from '../api.service';

/**
 * This component demonstrates:
 * 1. Getting data from a service
 * 2. Using async pipe (Angular handles subscribe/unsubscribe)
 * 3. RxJS operators with pipe()
 */
@Component({
  selector: 'app-observable-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observable-demo.component.html',
  styleUrls: ['./observable-demo.component.scss']
})
export class ObservableDemoComponent implements OnInit {
  // Observable stream - notice the $ naming convention
  users$!: Observable<User[]>;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * BEST PRACTICE: Use async pipe in template
   * - No manual subscribe needed
   * - Angular handles unsubscribe automatically
   */
  loadUsers(): void {
    this.users$ = this.apiService.getUsers$();
  }

  /**
   * Example: Using RxJS operators with pipe()
   * - map: transform each value
   * - filter: only let some values through
   */
  loadFilteredUsers(): void {
    this.users$ = this.apiService.getUsers$().pipe(
      map(users => users.map(u => ({ ...u, name: u.name.toUpperCase() }))), // Transform names to uppercase
      filter(users => users.length > 0) // Only show if we have users
    );
  }
}

/**
 * KEY CONCEPTS:
 *
 * 1. Observable = Stream of data over time
 *    - Can emit 0, 1, or many values
 *    - Naming: add $ at the end (users$)
 *
 * 2. HttpClient returns Observables (Cold/Netflix)
 *    - Don't execute until subscribed
 *    - Each subscription = new HTTP request
 *
 * 3. Async Pipe (Best Practice)
 *    - Automatically subscribes/unsubscribes
 *    - No memory leaks
 *
 * 4. RxJS Operators with pipe()
 *    - map: Transform data
 *    - filter: Filter values
 *    - debounceTime: Wait before emitting
 */
