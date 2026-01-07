// api.service.ts
// Q2: Service demonstrating HttpClient and Observables

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * API Service using HttpClient
 * Demonstrates:
 * - HttpClient for network communication
 * - Observables as return types
 * - RxJS operators for data transformation
 * - Error handling
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Using JSONPlaceholder - a free fake REST API for testing
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  /**
   * Constructor: HttpClient injected via DI
   * HttpClient is Angular's built-in service for HTTP communication
   */
  constructor(private http: HttpClient) {
    console.log('ApiService instantiated');
  }

  /**
   * GET request - Fetch posts
   * Returns: Cold Observable that emits once when subscribed
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      // RxJS operator: transform the data
      map(posts => posts.slice(0, 5)), // Take only first 5 posts
      // Error handling
      catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('Failed to fetch posts'));
      })
    );
  }

  /**
   * GET request with ID parameter
   */
  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  /**
   * POST request - Create new post
   * Demonstrates: sending data to server
   */
  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post);
  }

  /**
   * GET users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.slice(0, 3))
    );
  }

  /**
   * Simulated async operation using Observable
   * Demonstrates creating Observables without HTTP
   */
  getLocalData(): Observable<string[]> {
    const data = ['Angular', 'RxJS', 'TypeScript', 'Observables'];
    // 'of' creates an Observable from values
    return of(data).pipe(
      delay(500) // Simulate network delay
    );
  }
}

/**
 * Key Concepts:
 *
 * HttpClient:
 * - Angular's service for HTTP requests
 * - Returns Observables (cold by default)
 * - Automatically handles JSON parsing
 * - Type-safe with generics: http.get<Type>()
 *
 * Observables:
 * - Lazy: don't execute until subscribed
 * - Can emit multiple values over time
 * - Support cancellation via unsubscribe
 * - Composable with RxJS operators
 *
 * Common HTTP Methods:
 * - GET: http.get(url)
 * - POST: http.post(url, body)
 * - PUT: http.put(url, body)
 * - DELETE: http.delete(url)
 */
