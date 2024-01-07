import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/auth';
  private tokenKey = 'token'

  constructor(private http: HttpClient) {}

  register(registerData: Auth): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerData);
  }

  login(loginData: Auth): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey)
  }

  logout(): void {
    this.removeToken()
  }
}
