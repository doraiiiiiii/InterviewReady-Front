import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  email: string;
  name: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  loginForm: LoginRequest = { email: '', password: '' };
  errorMessage: string | null = null;
  loading = false;

  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    this.http.post<AuthResponse>(this.apiUrl, this.loginForm)
      .pipe(
        tap(response => {
          // Stocker le token dans localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userEmail', response.email);
          localStorage.setItem('userName', response.name);
          console.log('Connexion réussie', response);
          this.closeModal(); // Ferme le modal après succès
        }),
        catchError(error => {
          this.loading = false;
          if (error.status === 401) {
            this.errorMessage = 'Invalid email or password';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          console.error('Erreur de connexion', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  closeModal() {
    this.close.emit();
  }

  switchToSignup(event: Event) {
    event.preventDefault();
    // TODO: Implémenter la logique pour passer au formulaire d'inscription
    console.log('Switch to signup');
  }
}