import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-q3-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Question 3 – Routing & SSR</h2>

    <ul>
      <li><a [routerLink]="['/q3/user', 42]">Route params: /q3/user/42</a></li>
      <li><a [routerLink]="['/lazy-users']">Lazy-loaded users page</a></li>
      <li><a [routerLink]="['/q3/admin']">Guarded admin route</a></li>
    </ul>
  `,
})
export class Q3PageComponent {}
