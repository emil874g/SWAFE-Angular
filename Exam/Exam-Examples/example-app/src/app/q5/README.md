# Question 5 - Signals & Styling

This section demonstrates Angular Signals, NgRx SignalStore, Responsive Web Design, and Angular Material.

## 1. Angular Signals

### Why use Signals?

- **Better Performance**: Fine-grained reactivity - only components using the signal re-render
- **Simpler than RxJS**: No need for subscriptions or unsubscribe logic for local state
- **Less Boilerplate**: More concise than traditional observables
- **Type-Safe**: Full TypeScript support

### How to use Signals?

#### Basic Signal

```typescript
count = signal(0); // Create a writable signal

// Read the signal
console.log(this.count()); // Call like a function

// Update the signal
this.count.set(5); // Set directly
this.count.update((c) => c + 1); // Update based on current value
```

#### Computed Signal

```typescript
doubleCount = computed(() => this.count() * 2);
// Automatically updates when count changes
```

#### Effects

```typescript
effect(() => {
  console.log(`Count is: ${this.count()}`);
  // Runs whenever count changes
});
```

## 2. NgRx SignalStore

### Why use SignalStore?

- **Centralized State**: Share state across components
- **Less Boilerplate**: Simpler than traditional NgRx Store
- **Type-Safe**: Full TypeScript inference
- **Built-in Methods**: Common patterns like `withMethods`, `withComputed`

### How to use SignalStore?

```typescript
export const TodoStore = signalStore(
  { providedIn: 'root' },

  // Define state
  withState({ todos: [] }),

  // Add computed values
  withComputed(({ todos }) => ({
    todoCount: computed(() => todos().length),
  })),

  // Add methods
  withMethods((store) => ({
    addTodo(title: string) {
      patchState(store, {
        todos: [...store.todos(), newTodo],
      });
    },
  }))
);
```

**Using in Components:**

```typescript
readonly store = inject(TodoStore);

// Access state
this.store.todos();
this.store.todoCount();

// Call methods
this.store.addTodo('New task');
```

## 3. Responsive Web Design

### Flexbox

**When to use:** One-dimensional layouts (row or column)

```scss
.container {
  display: flex;
  flex-direction: row; // or column
  justify-content: space-between; // horizontal alignment
  align-items: center; // vertical alignment
  gap: 1rem; // spacing between items
  flex-wrap: wrap; // allow wrapping
}

.item {
  flex: 1; // grow to fill space
  min-width: 200px; // prevent too small
}
```

**Use cases:**

- Navigation bars
- Button groups
- Card layouts
- Toolbars

### CSS Grid

**When to use:** Two-dimensional layouts (rows and columns)

```scss
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 3 equal columns
  // or: repeat(auto-fit, minmax(300px, 1fr)) // responsive columns
  gap: 1rem; // spacing between items
}

.item {
  grid-column: 1 / 3; // span 2 columns
  grid-row: 1 / 2; // specific row
}
```

**Use cases:**

- Page layouts
- Image galleries
- Dashboard widgets
- Complex forms

### Media Queries

**When to use:** Adapt layout to different screen sizes

**MOBILE FIRST APPROACH** (recommended):
Start with mobile styles as the default, then add complexity for larger screens using `min-width`.

```scss
// Mobile styles (default - no media query needed)
.container {
  grid-template-columns: 1fr; // single column for mobile
}

// Tablet (min-width: 768px)
@media (min-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

// Desktop (min-width: 1024px)
@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Why mobile first?**

- Most users browse on mobile devices
- Easier to add complexity than remove it
- Better performance (mobile loads base styles first)
- Progressive enhancement approach

**Common breakpoints:**

- Mobile: 320px - 767px (base styles, no media query)
- Tablet: 768px - 1023px (`@media (min-width: 768px)`)
- Desktop: 1024px+ (`@media (min-width: 1024px)`)

## 4. Angular Material

### Why use Angular Material?

- **Pre-built Components**: Buttons, cards, forms, dialogs, etc.
- **Accessible**: ARIA compliant out of the box
- **Consistent Design**: Material Design guidelines
- **Responsive**: Mobile-friendly by default
- **Customizable**: Theming support

### How to use Angular Material?

#### Installation

```bash
ng add @angular/material
```

#### Import and Use Components

```typescript
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [MatButtonModule, MatCardModule],
})
export class MyComponent {}
```

#### In Template

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Title</mat-card-title>
  </mat-card-header>
  <mat-card-content> Content here </mat-card-content>
  <mat-card-actions>
    <button mat-raised-button color="primary">Action</button>
  </mat-card-actions>
</mat-card>
```

#### Common Components

- **Buttons**: `mat-button`, `mat-raised-button`, `mat-icon-button`
- **Form Controls**: `mat-input`, `mat-select`, `mat-checkbox`
- **Navigation**: `mat-toolbar`, `mat-sidenav`, `mat-menu`
- **Layout**: `mat-card`, `mat-grid-list`, `mat-divider`
- **Data**: `mat-table`, `mat-paginator`, `mat-sort`

#### Button Variants

```html
<button mat-button>Basic</button>
<button mat-raised-button>Raised</button>
<button mat-raised-button color="primary">Primary</button>
<button mat-raised-button color="accent">Accent</button>
<button mat-raised-button color="warn">Warn</button>
<button mat-icon-button><mat-icon>favorite</mat-icon></button>
```

## Project Structure

Each demo is organized in its own subfolder:

```
q5/
├── signals-demo/
│   ├── signals-demo.component.ts
│   ├── signals-demo.component.html
│   └── signals-demo.component.scss
├── signal-store-demo/
│   ├── signal-store-demo.component.ts
│   ├── signal-store-demo.component.html
│   ├── signal-store-demo.component.scss
│   └── todo.store.ts
├── responsive-demo/
│   ├── responsive-demo.component.ts
│   ├── responsive-demo.component.html
│   └── responsive-demo.component.scss
└── material-demo/
    ├── material-demo.component.ts
    ├── material-demo.component.html
    └── material-demo.component.scss
```

## Running the Examples

```bash
npm start
```

Navigate to `/q5` to see all demos in action.
