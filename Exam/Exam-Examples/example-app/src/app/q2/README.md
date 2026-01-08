# Question 2 - Reactive Programming & HttpClient

**Simplified examples for easy presentation**

## Key Concepts

### 1. **Reactive Programming with Observables**

- **Observable**: Stream of data over time
- **Cold Observable**: Doesn't execute until subscribed (like HttpClient)
- **Lazy Evaluation**: Only runs when you call `.subscribe()`
- **Can emit**: 0, 1, or many values

### 2. **HttpClient in Angular**

```typescript
// Always returns Observables
http.get<Type>(url); // GET request
http.post<Type>(url, data); // POST request
```

**Best Practices:**

- ✅ Use TypeScript generics for type safety
- ✅ Use async pipe (no manual subscribe/unsubscribe)
- ✅ HttpClient is injected via DI
- ✅ Automatically parses JSON

### 3. **RxJS Operators**

```typescript
// Common operators:
map(); // Transform data
filter(); // Filter values
debounceTime(ms); // Wait before emitting
distinctUntilChanged(); // Only emit if changed
```

### 4. **Subject**

- Special Observable that can **emit** values
- Used for event streams (like search input)

```typescript
private searchSubject = new Subject<string>();
searchSubject.next(value);  // Emit value
searchSubject.subscribe();  // Subscribe
```

## Code Examples

### Example 1: HttpClient with Async Pipe

**File:** [observable-demo.component.ts](observable-demo/observable-demo.component.ts)

Shows:

- GET request using HttpClient
- Async pipe pattern (preferred)
- POST request example

### Example 2: Reactive Search

**File:** [search-demo.component.ts](search-demo/search-demo.component.ts)

Shows:

- Subject for user input
- `debounceTime()` - wait for user to stop typing
- `distinctUntilChanged()` - only search if value changed

### Example 3: API Service

**File:** [api.service.ts](api.service.ts)

Shows:

- HttpClient injection
- Returning Observables
- Using `map()` operator to transform data

## Quick Comparison

| Manual Subscribe                | Async Pipe       |
| ------------------------------- | ---------------- |
| `subscribe()` + `unsubscribe()` | Automatic        |
| More code                       | Less code        |
| Risk of memory leaks            | No leaks         |
| ❌ Not recommended              | ✅ Best practice |

## Running the Demo

1. Navigate to Q2 page in the app
2. Click "Observable Demo" to see HttpClient
3. Click "Search Demo" to see reactive search
   ├── q2-page.component.ts # Main page wrapper
   ├── q2-page.component.html # Page template
   ├── q2-page.component.scss # Page styles
   ├── api.service.ts # HttpClient service with API calls
   ├── observable-demo.component.ts # Demonstrates Observables, HttpClient, operators
   ├── observable-demo.component.html
   ├── search-demo.component.ts # Demonstrates reactive search with RxJS
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
```
