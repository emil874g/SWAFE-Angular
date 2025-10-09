import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  console.log('Auth Guard Check:', isAuth, 'Token:', authService.getToken());

  if (isAuth) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
