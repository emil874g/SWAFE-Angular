// api.service.ts
// Q2: Super Simple HttpClient Example

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * BEST PRACTICE:
 * - Put HTTP logic in services
 * - Return Observables (don't subscribe here)
 * - Use async pipe in component template
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // Inject HttpClient
  constructor(private http: HttpClient) {}

  // Simple GET request - returns Observable
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Example with RxJS operators in pipe()
  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.slice(0, 5)),  // Transform: take first 5
      catchError(error => {
        console.error('Error:', error);
        return of([]);  // Fallback to empty array
      })
    );
  }
}

/**
 * KEY CONCEPTS:
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
