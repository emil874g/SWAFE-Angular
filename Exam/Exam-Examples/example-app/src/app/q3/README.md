# Question 3 - Routing & SSR

This folder demonstrates Angular routing and server-side rendering concepts.

## Topics Covered

### 1. Routing Basics
- **Route Configuration**: Defining routes in app.routes.ts
- **RouterLink**: Declarative navigation in templates
- **Router Service**: Programmatic navigation
- **Nested Routes**: Parent/child route structure

See: [product-list.component.ts](product-list.component.ts), [q3-page.component.html](q3-page.component.html)

### 2. Route Parameters
- **Path Parameters**: `/product/:id`
- **Query Parameters**: `/product/1?search=term`
- **ActivatedRoute**: Access route information
- **Snapshot vs Observable**: Two ways to read parameters

See: [product-detail.component.ts](product-detail.component.ts)

### 3. Lazy Loading
- **Purpose**: Load features on-demand
- **Benefits**: Smaller initial bundle, faster load times
- **Implementation**: `loadComponent()` in routes
- **Code Splitting**: Automatic bundle separation

See: [lazy-feature.component.ts](lazy-feature.component.ts)

### 4. Route Guards
- **Purpose**: Protect routes from unauthorized access
- **Types**: CanActivate, CanDeactivate, CanLoad, Resolve
- **Implementation**: Functional guards (modern approach)
- **Common Uses**: Authentication, authorization, unsaved changes

See: [auth.guard.ts](auth.guard.ts), [protected.component.ts](protected.component.ts)

### 5. Server-Side Rendering (SSR)
- **Why SSR**: Better SEO, faster initial load, social media previews
- **How It Works**: Server pre-renders HTML before sending to browser
- **Platform Check**: `isPlatformBrowser()` to detect environment
- **Considerations**: No window/document on server

See: [ssr-demo.component.ts](ssr-demo.component.ts)

## File Structure

```
q3/
├── README.md (this file)
├── q3-page.component.ts           # Main page with nested routes
├── q3-page.component.html         # Page template
├── q3-page.component.scss         # Page styles
├── product-list.component.ts      # List with routing navigation
├── product-detail.component.ts    # Route parameters demo
├── lazy-feature.component.ts      # Lazy-loaded component
├── auth.guard.ts                  # Route guard example
├── protected.component.ts         # Guarded route component
└── ssr-demo.component.ts          # SSR explanation
```

## How to Explain (10-minute structure)

1. **Routing Basics** (2 min): Show route config and navigation
2. **Route Parameters** (2 min): Click product, show ID in URL
3. **Lazy Loading** (2 min): Explain code-splitting, check Network tab
4. **Route Guards** (2 min): Try accessing protected route
5. **SSR** (2 min): View page source, explain benefits

## Key Concepts to Mention

### Routing:
```typescript
// Route configuration
{ path: 'product/:id', component: ProductDetailComponent }

// Navigation
<a [routerLink]="['/product', 123]">Product</a>
this.router.navigate(['/product', 123]);

// Access parameters
this.route.snapshot.paramMap.get('id')
```

### Lazy Loading:
```typescript
// In routes
{
  path: 'lazy',
  loadComponent: () => import('./lazy.component').then(m => m.LazyComponent)
}
```

### Guards:
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const isAuth = checkAuthentication();
  return isAuth ? true : false;
};
```

### SSR:
```typescript
// Check platform
import { isPlatformBrowser } from '@angular/common';
if (isPlatformBrowser(this.platformId)) {
  // Browser-only code
}
```

## Running the Example

Navigate to Q3 tab and try:
1. Click products to see route parameters
2. Click "Lazy-Loaded Component" (check Network tab)
3. Click "Protected Route" (may be denied by guard)
4. View page source (Ctrl+U) to see SSR HTML
