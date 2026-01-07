// observable-demo.component.ts
// Q2: Component demonstrating Observables and RxJS operators

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, interval, of } from 'rxjs';
import { map, filter, take, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ApiService, Post } from '../api.service';

@Component({
  selector: 'app-observable-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './observable-demo.component.html',
  styleUrls: ['./observable-demo.component.scss']
})
export class ObservableDemoComponent implements OnInit, OnDestroy {
  // Observable streams
  posts$!: Observable<Post[]>;
  counter$!: Observable<number>;
  localData$!: Observable<string[]>;

  // Data for display
  posts: Post[] = [];
  counterValue: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';

  // Subject for cleanup (unsubscribe pattern)
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Load data on component initialization
    this.loadPosts();
    this.loadLocalData();
    this.startCounter();
  }

  /**
   * HttpClient Observable Example
   * Demonstrates: HTTP GET request, async pipe alternative
   */
  loadPosts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Subscribe to Observable returned by HttpClient
    this.apiService.getPosts()
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when component destroys
      .subscribe({
        next: (data) => {
          this.posts = data;
          this.isLoading = false;
          console.log('Posts loaded:', data);
        },
        error: (error) => {
          this.errorMessage = 'Failed to load posts';
          this.isLoading = false;
          console.error('Error:', error);
        },
        complete: () => {
          console.log('Observable completed');
        }
      });
  }

  /**
   * Observable with async pipe
   * Better practice: let Angular handle subscription
   */
  loadPostsWithAsyncPipe(): void {
    this.posts$ = this.apiService.getPosts();
  }

  /**
   * Local Observable Example
   */
  loadLocalData(): void {
    this.localData$ = this.apiService.getLocalData();
  }

  /**
   * RxJS Operators Example
   * Demonstrates: interval, map, filter, take
   */
  startCounter(): void {
    this.counter$ = interval(1000).pipe( // Emit every second
      map(n => n + 1),                   // Transform: add 1
      filter(n => n % 2 === 0),          // Filter: only even numbers
      take(5)                            // Take only first 5 emissions
    );

    // Subscribe to counter
    this.counter$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.counterValue = value;
    });
  }

  /**
   * Create new post (POST request)
   */
  createNewPost(): void {
    const newPost = {
      title: 'New Post from Angular',
      body: 'This demonstrates a POST request',
      userId: 1
    };

    this.apiService.createPost(newPost)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (created) => {
          console.log('Post created:', created);
          alert(`Post created with ID: ${created.id}`);
        },
        error: (error) => console.error('Error creating post:', error)
      });
  }

  /**
   * Cleanup subscriptions on component destroy
   * Prevents memory leaks
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Key Concepts Demonstrated:
 *
 * 1. Cold Observables (HttpClient):
 *    - Don't execute until subscribed
 *    - Each subscription triggers new HTTP request
 *
 * 2. RxJS Operators:
 *    - map: Transform emitted values
 *    - filter: Filter emitted values
 *    - take: Take n emissions then complete
 *    - debounceTime: Wait for pause in emissions
 *    - distinctUntilChanged: Emit only when value changes
 *    - catchError: Handle errors
 *    - takeUntil: Unsubscribe when another Observable emits
 *
 * 3. Subscription Management:
 *    - Manual: subscribe() + unsubscribe()
 *    - Async pipe: Automatic subscription/unsubscription
 *    - takeUntil pattern: Unsubscribe on component destroy
 *
 * 4. HttpClient Best Practices:
 *    - Use TypeScript generics for type safety
 *    - Always handle errors with catchError
 *    - Prefer async pipe over manual subscriptions
 *    - Use takeUntil for cleanup
 */
