import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string; email: string; name: string }> {
    return this.http.post<{ token: string; email: string; name: string }>(`${this.apiUrl}/login`, credentials);
  }

  signup(user: { name: string; email: string; password: string }): Observable<{ token: string; email: string; name: string }> {
    return this.http.post<{ token: string; email: string; name: string }>(`${this.apiUrl}/signup`, user);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  saveUser(user: { email: string; name: string }): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): { email: string; name: string } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  }
}