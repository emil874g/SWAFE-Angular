import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/credit-card.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'https://assignment1.swafe.dk/api/CreditCard';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCreditCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCreditCard(id: number): Observable<CreditCard> {
    return this.http.get<CreditCard>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.apiUrl, creditCard, { headers: this.getHeaders() });
  }

  deleteCreditCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
