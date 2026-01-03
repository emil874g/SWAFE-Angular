import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = false; // demo

  if (!isLoggedIn) {
    return router.parseUrl('/q3');
  }
  return true;
};
