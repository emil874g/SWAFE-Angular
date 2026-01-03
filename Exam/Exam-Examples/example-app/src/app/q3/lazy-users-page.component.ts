import { Component } from '@angular/core';

@Component({
  selector: 'app-lazy-users-page',
  standalone: true,
  template: `
    <h3>Lazy Users Page</h3>
    <p>This component was loaded lazily via loadComponent.</p>
  `,
})
export class LazyUsersPageComponent {}
