import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/user';
  private headers: {};

  constructor(private http: HttpClient) {
    this.headers = { headers: this.getRequestHeaders() };
  }

  private getRequestHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });

    return headers;
  }

  getUserData(): Observable<any> {
    const headers = this.getRequestHeaders();
    return this.http.get(`${this.baseUrl}/get-user-profile`, { headers });
  }
}
