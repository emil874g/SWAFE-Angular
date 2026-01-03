// user-search.component.ts
// Q2: dedicated example for reactive programming with RxJS operators + HttpClient.

import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgFor],
  styleUrls: ['./user-search.component.scss'],
  template: `
    <h2>Q2: Reactive user search</h2>
    <input [formControl]="searchControl" placeholder="Search users" />

    <ul>
      @for (user of (results$ | async) ?? []; track user.id) {
        <li>{{ user.name }}</li>
      }
    </ul>
  `,
})
export class UserSearchComponent {
  // Q2: stream of search terms
  searchControl = new FormControl('');

  // Q2: stream of HTTP results built with RxJS operators
  results$: Observable<User[]> = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    filter(term => (term ?? '').length > 1),
    switchMap(term => this.userService.searchUsers(term ?? ''))
  );

  constructor(private userService: UserService) {}
}
