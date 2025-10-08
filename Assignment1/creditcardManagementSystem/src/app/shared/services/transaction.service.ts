import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'https://assignment1.swafe.dk/api/Transaction';

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getTransactions(cardNumber?: string): Observable<Transaction[]> {
    let params = new HttpParams();
    if (cardNumber) {
      params = params.set('cardNumber', cardNumber);
    }
    return this.http.get<Transaction[]>(this.apiUrl, { 
      headers: this.getHeaders(),
      params 
    });
  }

  getTransactionsByCreditCard(creditCardId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/creditcard/${creditCardId}`, { 
      headers: this.getHeaders() 
    });
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction, { headers: this.getHeaders() });
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
