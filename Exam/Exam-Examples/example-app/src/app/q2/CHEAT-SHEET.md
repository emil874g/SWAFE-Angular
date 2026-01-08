# Q2 Exam Cheat Sheet 🎯

## Your 3 Code Examples

### 1. **Service with HttpClient** ([api.service.ts](api.service.ts))

```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>(url).pipe(
      map((users) => users.slice(0, 5)) // RxJS operator!
    );
  }
}
```

**Say:** "Service handles HTTP, returns Observable, uses map operator"

---

### 2. **Component with Async Pipe** ([observable-demo.component.ts](observable-demo/observable-demo.component.ts))

```typescript
export class ObservableDemoComponent {
  users$!: Observable<User[]>; // Notice the $

  constructor(public apiService: ApiService) {}

  loadUsers() {
    this.users$ = this.apiService.getUsers$();
  }
}
```

**Template:**

```html
<div *ngFor="let user of users$ | async">{{ user.name }}</div>
```

**Say:** "Async pipe handles subscribe/unsubscribe automatically - best practice!"

---

### 3. **Reactive Search** ([search-demo.component.ts](search-demo/search-demo.component.ts))

```typescript
private searchSubject = new Subject<string>();  // Hot Observable

ngOnInit() {
  this.searchSubject.pipe(
    debounceTime(300),         // Wait 300ms
    distinctUntilChanged()     // Only if changed
  ).subscribe(term => this.search(term));
}

onSearchChange(term: string) {
  this.searchSubject.next(term);  // Push value
}
```

**Say:** "Subject is hot - I can push values. debounceTime waits for user to stop typing"

---

## Key Words to Use

**Reactive Programming:**

- "React to data over time"
- "Streams of values"
- "Declare how UI updates"

**Observables:**

- "Cold like Netflix - starts when subscribed"
- "Hot like Live TV - already running"
- "$ naming convention"

**HttpClient:**

- "Returns Observables"
- "In services, not components"
- "Async pipe is best practice"

**RxJS:**

- "pipe() chains operators"
- "map transforms, filter selects"
- "debounceTime waits, switchMap cancels"

---

## If They Ask...

**"Why Observables?"**
→ "Handle async data, can emit many values, composable with operators"

**"Why async pipe?"**
→ "Angular handles subscribe/unsubscribe automatically, prevents memory leaks"

**"What's the difference between cold and hot?"**
→ "Cold starts when you subscribe (HttpClient), Hot is already running (Subject)"

**"What operators do you use?"**
→ "map to transform, filter to select, debounceTime for search, switchMap to cancel previous requests"

---

## Presentation Order

1. Start with reactive concept _(30 sec)_
2. Show service with HttpClient _(1 min)_
3. Show component with async pipe _(1 min)_
4. Show operators with pipe() _(1 min)_
5. Show search example if time _(1 min)_

**Total: ~5 minutes** - You got this! 💪
