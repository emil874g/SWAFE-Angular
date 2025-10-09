import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  error = '';

  onSubmit(): void {
    console.log('LoginComponent: Submitting login for', this.username);
    this.error = '';
    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => {
          console.log('LoginComponent: Login successful, navigating to /home');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log('LoginComponent: Login failed', err);
          this.error = 'Invalid username or password';
        }
      });
  }
}
