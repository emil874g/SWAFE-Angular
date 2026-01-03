// user-list.component.ts
// Q1: parent component that renders a list and selects users.
// Q2: can also demonstrate HttpClient + async pipe by using users$ instead of localUsers.

import { Component } from '@angular/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService, User } from '../user.service';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, UserItemComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  // Q1 option: simple array (no HTTP)
  localUsers: User[] =[];

  // Q2 option: reactive HTTP data stream
  users$!: Observable<User[]>;

  constructor(private userService: UserService) {
    this.localUsers = this.userService.getLocalUsers(); // Q1
    this.users$ = this.userService.getUsers();          // Q2
  }

  onUserSelected(user: User): void {
    // Q1: delegate selection to the service
    this.userService.selectUser(user);
  }
}
