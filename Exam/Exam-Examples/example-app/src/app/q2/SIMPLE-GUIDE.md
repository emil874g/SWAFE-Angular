# Q2 - Reactive Programming (Super Simple!)

## What to Show During Exam

### 1️⃣ **What is Reactive Programming?**

> "React to data over time instead of manually pulling values"

**Example:** User types in search → app reacts to each keystroke

---

### 2️⃣ **Observables & RxJS**

**Observable** = Stream of values over time

```typescript
users$; // The $ means "this is a stream"
```

**Three types of events:**

- `next` - new value arrives
- `error` - something went wrong
- `complete` - stream is done

**Cold vs Hot:**

- **Cold (Netflix)** - Starts when you subscribe (like HttpClient)
- **Hot (Live TV)** - Already running (like Subject)

---

### 3️⃣ **RxJS Operators with pipe()**

Chain operators to transform streams:

```typescript
users$.pipe(
  map((x) => x * 10), // Transform each value
  filter((x) => x > 100), // Only let some through
  debounceTime(300) // Wait 300ms
);
```

**Common operators:**

- `map` - change each value
- `filter` - let only some values through
- `switchMap` - cancel previous request (perfect for search)
- `debounceTime` - wait for user to stop typing

---

### 4️⃣ **HttpClient Best Practices**

**Pattern:**

1. **Service** - handles HTTP, returns Observable
2. **Component** - uses async pipe in template
3. **No manual subscribe/unsubscribe needed!**

**Service Example:**

```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

**Component Template:**

```html
<div *ngFor="let user of users$ | async">{{ user.name }}</div>
```

> "Keep HTTP in services, return Observables, use async pipe in component"

---

## Code Examples to Show

### Example 1: [api.service.ts](api.service.ts)

- Simple HttpClient GET request
- Returns Observable
- Example with `map()` operator

### Example 2: [observable-demo.component.ts](observable-demo/observable-demo.component.ts)

- Using async pipe (best practice)
- Example with `map()` and `filter()` operators
- Shows Cold Observable behavior

### Example 3: [search-demo.component.ts](search-demo/search-demo.component.ts)

- Subject (Hot Observable - you can push values)
- `debounceTime()` - wait for user to stop typing
- `distinctUntilChanged()` - only search if value changed

---

## Quick Talking Points

**Reactive Programming:**

- ✅ React to data streams over time
- ✅ Declare how UI updates when data changes
- ✅ Don't write step-by-step updates

**Observables:**

- ✅ Stream that can emit many values
- ✅ Lazy - doesn't run until subscribed
- ✅ Use `$` naming convention

**HttpClient:**

- ✅ Returns Observables
- ✅ Put logic in services
- ✅ Use async pipe in components
- ✅ Angular handles subscribe/unsubscribe

**RxJS Operators:**

- ✅ Transform streams with `pipe()`
- ✅ `map`, `filter`, `debounceTime`, `switchMap`
- ✅ Composable and chainable

---

## How to Present This

1. **Start with the concept:** "Reactive programming means reacting to data over time"
2. **Show the service:** "HTTP logic goes in services, returns Observable"
3. **Show the component:** "Component uses async pipe - Angular handles everything"
4. **Show operators:** "We can transform streams with pipe() and operators like map"
5. **Show search example:** "Subject lets us push values, debounceTime waits for user to stop typing"

Keep it simple - you don't need to explain everything in detail!
