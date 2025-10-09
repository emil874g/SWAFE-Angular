import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiConfig {
  baseUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://assignment1.swafe.dk';

  private getHeaders() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return { headers: { Authorization: `Bearer ${token}` } };
    }
    return {};
  }

  // CreditCard endpoints
  getCreditCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/api/CreditCard`, this.getHeaders());
  }

  getCreditCardByNumber(cardNumber: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/api/CreditCard/${cardNumber}`, this.getHeaders());
  }

  createCreditCard(card: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/api/CreditCard`, card, this.getHeaders());
  }

  deleteCreditCard(cardNumber: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/CreditCard/${cardNumber}`, this.getHeaders());
  }

  // Transaction endpoints
  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/api/Transaction`, this.getHeaders());
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/api/Transaction`, transaction, this.getHeaders());
  }

  deleteTransaction(uid: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/Transaction/${uid}`, this.getHeaders());
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.BASE_URL}/api/Login`, { username, password }, { responseType: 'text' });
  }
}
