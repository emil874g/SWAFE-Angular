import { Injectable, inject, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);
  private readonly TOKEN_KEY = 'auth_token';

  private tokenSignal = signal<string | null>(this.getStoredToken());

  isAuthenticated = computed(() => {
    const token = this.tokenSignal();
    console.log('AuthService: isAuthenticated computed, token exists:', !!token);
    return !!token;
  });

  constructor() {
    const storedToken = this.getStoredToken();
    console.log('AuthService: Initialized, stored token:', storedToken ? 'present' : 'null');
  }

  login(username: string, password: string): Observable<string> {
    console.log('AuthService: Attempting login for', username);
    return this.apiService.login(username, password)
      .pipe(
        tap((response: any) => {
          console.log('AuthService: Login response:', response);
          let token: string | null = null;
          if (typeof response === 'string') {
            token = response;
          } else if (response && response.token) {
            token = response.token;
          }
          if (token) {
            console.log('AuthService: Setting token:', token);
            this.setToken(token);
          } else {
            console.log('AuthService: No token found in response');
          }
        })
      );
  }

  setToken(token: string): void {
    console.log('AuthService: Setting token in localStorage:', token);
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
    console.log('AuthService: Token signal updated, isAuthenticated:', this.isAuthenticated());
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private getStoredToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('AuthService: getStoredToken:', token ? 'present' : 'null');
    return token;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
  }
}
