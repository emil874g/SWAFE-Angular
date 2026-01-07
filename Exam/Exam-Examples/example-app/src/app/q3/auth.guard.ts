// auth.guard.ts
// Q3: Simple route guard example

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

/**
 * Functional Route Guard (Modern Angular approach)
 *
 * Guards protect routes from unauthorized access
 * Returns: true (allow) or false (deny)
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Simulate authentication check
  const isAuthenticated = checkAuth();

  if (isAuthenticated) {
    console.log('Access granted to:', state.url);
    return true;
  } else {
    console.log('Access denied. Redirecting to login...');
    // Redirect to login or home
    router.navigate(['/q3']);
    return false;
  }
};

/**
 * Simulated authentication check
 * In real app: check token, session, or auth service
 */
function checkAuth(): boolean {
  // For demo: randomly allow/deny
  // In real app: return this.authService.isLoggedIn()
  const isAuth = Math.random() > 0.5;
  console.log('Auth check:', isAuth ? 'Authenticated' : 'Not authenticated');
  return isAuth;
}

/**
 * Types of Guards:
 *
 * 1. CanActivate: Can route be activated?
 * 2. CanActivateChild: Can child routes be activated?
 * 3. CanDeactivate: Can user leave the route? (e.g., unsaved changes)
 * 4. CanLoad: Can lazy module be loaded?
 * 5. Resolve: Pre-fetch data before activating route
 *
 * Usage in routes:
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canActivate: [authGuard]
 * }
 */
