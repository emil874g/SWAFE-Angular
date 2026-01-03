// Q1: show list + selected user to talk about components, DI, communication.

import { Component } from '@angular/core';
import { UserListComponent } from '../users/user-list/user-list.component';
import { SelectedUserComponent } from '../users/selected-user/selected-user.component';

@Component({
  selector: 'app-q1-page',
  standalone: true,
  imports: [UserListComponent, SelectedUserComponent],
  templateUrl: './q1-page.component.html',
  styleUrl: './q1-page.component.scss'
})
export class Q1PageComponent {}
