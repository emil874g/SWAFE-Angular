# Question 1 - Angular Basics

This folder contains code demonstrating fundamental Angular concepts for the oral exam.

## Topics Covered

### 1. Components
- **Component Definition**: TypeScript class with `@Component` decorator
- **Template**: HTML view (inline or external)
- **Styling**: Component-scoped CSS/SCSS
- **Lifecycle**: ngOnInit, ngOnDestroy, etc.

See: [parent.component.ts](parent.component.ts), [child.component.ts](child.component.ts)

### 2. Services
- **Purpose**: Share data and logic across components
- **Injectable**: `@Injectable({ providedIn: 'root' })` for singleton
- **Methods**: Business logic and data management

See: [data.service.ts](data.service.ts)

### 3. Pipes
- **Pure Pipes**: Transform data in templates
- **Custom Pipes**: Create with `@Pipe` decorator
- **Built-in**: date, uppercase, lowercase, currency, etc.

See: [uppercase-custom.pipe.ts](uppercase-custom.pipe.ts)

### 4. Directives
- **Attribute Directives**: Modify element appearance/behavior
- **Structural Directives**: Change DOM structure (*ngIf, *ngFor)
- **Custom Directives**: Create with `@Directive` decorator

See: [highlight.directive.ts](highlight.directive.ts)

### 5. Dependency Injection
- **Constructor Injection**: Angular's DI system
- **Hierarchical Injectors**: Root, Module, Component level
- **Providers**: Configure how dependencies are created

See: [parent.component.ts](parent.component.ts) (constructor with service injection)

### 6. Component-to-Component Communication
- **@Input**: Parent → Child (property binding)
- **@Output + EventEmitter**: Child → Parent (event binding)
- **Service**: Shared state for sibling/distant components

See: [parent.component.ts](parent.component.ts) ↔ [child.component.ts](child.component.ts)

## File Structure

```
q1/
├── README.md (this file)
├── q1-page.component.ts         # Main page wrapper
├── q1-page.component.html       # Page template
├── q1-page.component.scss       # Page styles
├── parent.component.ts          # Parent component demonstrating DI and communication
├── parent.component.html        # Template with pipe and directive usage
├── child.component.ts           # Child component with @Input/@Output
├── child.component.html         # Child template
├── data.service.ts              # Injectable service
├── uppercase-custom.pipe.ts     # Custom pipe
└── highlight.directive.ts       # Custom attribute directive
```

## How to Explain (10-minute structure)

1. **Components** (2 min): Show parent.component.ts structure
2. **Services + DI** (2 min): Show data.service.ts and constructor injection
3. **Component Communication** (2 min): Show @Input/@Output between parent/child
4. **Pipes** (2 min): Show custom pipe in template
5. **Directives** (2 min): Show highlight directive in action

## Running the Example

Navigate to the Q1 tab in your app to see all concepts in action.
