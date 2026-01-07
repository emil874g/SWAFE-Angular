# Question 2 - Reactive Programming & HttpClient

This folder demonstrates reactive programming concepts for the oral exam.

## Topics Covered

### 1. Observables
- **Cold Observables**: Don't execute until subscribed (HttpClient returns these)
- **Hot Observables**: Execute regardless of subscriptions
- **Subscription Management**: Manual subscriptions, async pipe, takeUntil pattern
- **Lazy Evaluation**: Observables don't execute until subscribed

See: [observable-demo.component.ts](observable-demo.component.ts)

### 2. RxJS Operators
- **Transformation**: `map`, `switchMap`
- **Filtering**: `filter`, `distinctUntilChanged`
- **Timing**: `debounceTime`, `delay`
- **Utility**: `take`, `takeUntil`, `catchError`

See: [observable-demo.component.ts](observable-demo.component.ts), [search-demo.component.ts](search-demo.component.ts)

### 3. HttpClient
- **GET Requests**: Fetching data from API
- **POST Requests**: Sending data to API
- **Type Safety**: Using generics `http.get<Type>()`
- **Error Handling**: Using `catchError` operator
- **Automatic JSON Parsing**: Built into HttpClient

See: [api.service.ts](api.service.ts)

### 4. Reactive Programming Best Practices
- **Async Pipe**: Let Angular handle subscriptions/unsubscriptions
- **takeUntil Pattern**: Clean up subscriptions on component destroy
- **Error Handling**: Always use `catchError` for HTTP requests
- **Debouncing**: Use `debounceTime` for search inputs
- **Cancellation**: Use `switchMap` to cancel previous requests

See: All components

### 5. Subject vs Observable
- **Observable**: Can only subscribe (observer)
- **Subject**: Can subscribe AND emit values (both observer and observable)
- **BehaviorSubject**: Remembers last value, emits to new subscribers

## File Structure

```
q2/
├── README.md (this file)
├── q2-page.component.ts          # Main page wrapper
├── q2-page.component.html        # Page template
├── q2-page.component.scss        # Page styles
├── api.service.ts                # HttpClient service with API calls
├── observable-demo.component.ts  # Demonstrates Observables, HttpClient, operators
├── observable-demo.component.html
├── search-demo.component.ts      # Demonstrates reactive search with RxJS
└── search-demo.component.html
```

## How to Explain (10-minute structure)

1. **HttpClient Basics** (2 min): Show api.service.ts GET/POST requests
2. **Observables** (2 min): Explain cold observables, subscription lifecycle
3. **RxJS Operators** (3 min): Show map, filter, debounceTime, switchMap in action
4. **Best Practices** (2 min): Async pipe, takeUntil, error handling
5. **Live Demo** (1 min): Show search and HTTP requests working

## Key Concepts to Mention

**Observable vs Promise:**
- Observables: Lazy, cancellable, multiple values, composable
- Promises: Eager, not cancellable, single value

**HttpClient Returns Cold Observables:**
- Don't execute until subscribed
- Each subscription = new HTTP request
- Use `share()` operator to share one request

**Subscription Management:**
- Always unsubscribe to prevent memory leaks
- Use async pipe (best)
- Use takeUntil pattern
- Store subscriptions and unsubscribe in ngOnDestroy

## Running the Example

Navigate to the Q2 tab to see live demos of HttpClient and reactive search.
