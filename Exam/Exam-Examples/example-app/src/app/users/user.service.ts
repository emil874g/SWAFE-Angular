// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  // Q2 (REAL API – commented for local demo)
  // private readonly apiUrl = '/api/users';

  // Q1: simple in‑memory list to show components
  // + DI without needing a backend
  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Celine' },
    { id: 4, name: 'Bo' },
  ];

  // Q1: shared state for component‑to‑component communication (BehaviorSubject)
  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  // Q2: HttpClient injected via Angular DI for
  // network communication (for explanation / future real backend)
  constructor(private http: HttpClient) {}

  // Q1: synchronous source (for pure Q1 demo)
  getLocalUsers(): User[] {
    return this.users;
  }

  // Q2 (LOCAL DEMO): reactive "HTTP" call simulated with in‑memory data
  getUsers(): Observable<User[]> {
    // For local demo: wrap in-memory data in an Observable
    return of(this.users);
  }

  // Q2 (LOCAL DEMO): reactive search over in‑memory data
  searchUsers(term: string): Observable<User[]> {
    const lower = term.toLowerCase();
    const filtered = this.users.filter(user =>
      user.name.toLowerCase().includes(lower)
    );
    return of(filtered);
  }

  // Q2 (REAL API – uncomment if you have a backend that serves /api/users)
  /*
  private readonly apiUrl = '/api/users';

  getUsers(): Observable<User[]> {
    // Cold Observable: emits list once from the backend, then completes
    return this.http.get<User[]>(this.apiUrl);
  }

  searchUsers(term: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?q=${encodeURIComponent(term)}`);
  }
  */

  // Q1: method used by components to update the selected user
  selectUser(user: User): void {
    this.selectedUserSubject.next(user);
  }
}
