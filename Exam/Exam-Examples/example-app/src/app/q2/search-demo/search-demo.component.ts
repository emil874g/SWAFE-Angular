// search-demo.component.ts
// Q2: Simple Reactive Search Example

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService, User } from '../api.service';

/**
 * Demonstrates:
 * - Subject (hot stream - you can push values)
 * - debounceTime (wait for user to stop typing)
 * - distinctUntilChanged (only search if value changed)
 */
@Component({
  selector: 'app-search-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.scss']
})
export class SearchDemoComponent implements OnInit {
  searchTerm = '';
  users: User[] = [];
  allUsers: User[] = [];

  // Subject = Observable you can push values into (like live TV)
  private searchSubject = new Subject<string>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Load all users
    this.apiService.getUsers$().subscribe(users => {
      this.allUsers = users;
      this.users = users;
    });

    // Set up reactive search with operators
    this.searchSubject.pipe(
      debounceTime(300),         // Wait 300ms after user stops typing
      distinctUntilChanged()     // Only emit if value changed
    ).subscribe(term => {
      this.performSearch(term);
    });
  }

  // Called when user types - pushes value to the stream
  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  // Filter the users
  performSearch(term: string): void {
    if (!term) {
      this.users = this.allUsers;
    } else {
      this.users = this.allUsers.filter(u =>
        u.name.toLowerCase().includes(term.toLowerCase())
      );
    }
  }
}

/**
 * RxJS Operators Explained:
 *
 * debounceTime(ms):
 * - Waits for pause in emissions
 * - Perfect for search: wait until user stops typing
 * - Reduces unnecessary API calls
 *
 * distinctUntilChanged():
 * - Only emits when value changes
 * - Prevents duplicate searches for same term
 *
 * switchMap():
 * - Maps to new Observable
 * - Cancels previous inner Observable
 * - Perfect for search: cancel old request when new search starts
 *
 * takeUntil():
 * - Completes when another Observable emits
 * - Used for cleanup on component destroy
 *
 * Subject:
 * - Acts as both Observable and Observer
 * - Can manually emit values with next()
 * - Used to create custom event streams
 */
