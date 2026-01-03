// Q1: show list + selected user to talk about components, DI, communication.

import { Component } from '@angular/core';
import { UserListComponent } from '../users/user-list/user-list.component';
import { SelectedUserComponent } from '../users/selected-user/selected-user.component';

@Component({
  selector: 'app-q1-page',
  standalone: true,
  imports: [UserListComponent, SelectedUserComponent],
  template: `
    <h2>Question 1 – Angular basics</h2>
    <app-user-list></app-user-list>
    <app-selected-user></app-selected-user>
  `,
})
export class Q1PageComponent {}
