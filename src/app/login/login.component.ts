import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal">
      <div class="modal-content">
        <button class="modal-close" (click)="closeModal()">✕</button>
        <div class="auth-tabs">
          <label class="tab">
            <input type="radio" name="auth-mode" value="login" [(ngModel)]="authMode" (change)="resetForm()">
            <span>Login</span>
          </label>
          <label class="tab">
            <input type="radio" name="auth-mode" value="signup" [(ngModel)]="authMode" (change)="resetForm()">
            <span>Sign Up</span>
          </label>
        </div>
        <form class="auth-form">
          <div class="form-group" *ngIf="authMode === 'signup'">
            <label for="name">Name</label>
            <input id="name" type="text" [(ngModel)]="formData.name" name="name" placeholder="Enter your name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" [(ngModel)]="formData.email" name="email" placeholder="Enter your email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" [(ngModel)]="formData.password" name="password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="submit-btn" (click)="submitForm()">
            {{ authMode === 'login' ? 'Login' : 'Sign Up' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  authMode: 'login' | 'signup' = 'login';
  formData = {
    name: '',
    email: '',
    password: ''
  };

  resetForm() {
    this.formData = { name: '', email: '', password: '' };
  }

  submitForm() {
    console.log(`${this.authMode === 'login' ? 'Login' : 'Sign Up'} submitted:`, this.formData);
    this.closeModal();
  }

  closeModal() {
    console.log('Close modal clicked'); // Debug log
    this.resetForm();
    this.close.emit();
  }
}