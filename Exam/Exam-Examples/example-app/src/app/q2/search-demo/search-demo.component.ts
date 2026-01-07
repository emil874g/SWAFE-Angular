// search-demo.component.ts
// Q2: Demonstrates reactive search with RxJS operators

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { ApiService, User } from '../api.service';

@Component({
  selector: 'app-search-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-demo.component.html',
  styleUrls: ['./search-demo.component.scss']
})
export class SearchDemoComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  users: User[] = [];
  allUsers: User[] = [];
  isSearching: boolean = false;

  // Subject for search input stream
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Load all users first
    this.loadUsers();

    // Set up reactive search stream
    this.setupSearch();
  }

  /**
   * Load initial user data
   */
  loadUsers(): void {
    this.apiService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.allUsers = users;
        this.users = users;
      });
  }

  /**
   * Setup reactive search with RxJS operators
   * Demonstrates:
   * - debounceTime: Wait for user to stop typing
   * - distinctUntilChanged: Only search if term changed
   * - switchMap: Cancel previous search, start new one
   */
  setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),              // Wait 300ms after user stops typing
      distinctUntilChanged(),         // Only if search term changed
      takeUntil(this.destroy$)
    ).subscribe(term => {
      this.performSearch(term);
    });
  }

  /**
   * Called on input change
   * Pushes search term to the Subject stream
   */
  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  /**
   * Perform the actual search
   * Filters users locally (in real app, would be HTTP request)
   */
  performSearch(term: string): void {
    if (!term.trim()) {
      this.users = this.allUsers;
      return;
    }

    this.isSearching = true;

    // Simulate search with local filtering
    // In real app, this would be: this.apiService.searchUsers(term)
    setTimeout(() => {
      this.users = this.allUsers.filter(user =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
      );
      this.isSearching = false;
    }, 200);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.searchSubject.complete();
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
