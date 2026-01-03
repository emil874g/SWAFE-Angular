// app.component.ts
// Entry point for the demo app. Sections are clearly marked per exam question.

import { Component } from '@angular/core';
import { UserListComponent } from './users/user-list/user-list.component';
import { SelectedUserComponent } from './users/selected-user/selected-user.component';
import { UserSearchComponent } from './users/user-search/user-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent, SelectedUserComponent, UserSearchComponent],
  styleUrls: ['./app.scss'],
  template: `
    <h1>Angular Demo – Exam Questions</h1>

    <!-- Q1 section: components, services, DI, pipes, directives, communication -->
    <section>
      <h2>Question 1 – Angular in general</h2>
      <app-user-list></app-user-list>
      <app-selected-user></app-selected-user>
    </section>

    <!-- Q2 section: reactive programming, Observables/RxJS, HttpClient -->
    <section>
      <h2>Question 2 – Reactive programming & HttpClient</h2>
      <app-user-search></app-user-search>
    </section>

    <!-- Future questions: add new sections marked Q3, Q4, etc. -->
  `,
})
export class App {}
