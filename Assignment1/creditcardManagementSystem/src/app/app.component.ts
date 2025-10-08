import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthService } from './shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'creditcardManagementSystem';
  authService = inject(AuthService);
  
  showLogin = signal(false);
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  ngOnInit(): void {
    // Check if user is authenticated
    this.showLogin.set(!this.authService.isAuthenticated());
  }

  login(): void {
    this.loginError = '';
    this.authService.login({ email: this.loginEmail, password: this.loginPassword })
      .subscribe({
        next: () => {
          this.showLogin.set(false);
          this.loginEmail = '';
          this.loginPassword = '';
        },
        error: (err) => {
          this.loginError = 'Login failed. Please check your credentials.';
          console.error('Login error:', err);
        }
      });
  }
}
