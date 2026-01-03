// Q2: focus on Observables + "HTTP" + operators.

import { Component } from '@angular/core';
import { UserListComponent } from '../users/user-list/user-list.component';
import { UserSearchComponent } from '../users/user-search/user-search.component';

@Component({
  selector: 'app-q2-page',
  standalone: true,
  imports: [UserListComponent, UserSearchComponent],
  template: `
    <h2>Question 2 – Reactive programming & HttpClient</h2>

    <section>
      <h3>Users from Observable</h3>
      <app-user-list></app-user-list>
    </section>

    <section>
      <h3>Search with RxJS operators</h3>
      <app-user-search></app-user-search>
    </section>
  `,
})
export class Q2PageComponent {}
