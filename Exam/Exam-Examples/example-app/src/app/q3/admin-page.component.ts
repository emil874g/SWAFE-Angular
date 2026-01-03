import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  template: `
    <h3>Admin area</h3>
    <p>This route is protected by a guard.</p>
  `,
})
export class AdminPageComponent {}
