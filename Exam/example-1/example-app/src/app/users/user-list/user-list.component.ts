// user-list.component.ts
import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { UserService, User } from '../user.service';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, UserItemComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: User[];

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }

  onUserSelected(user: User): void {
    this.userService.selectUser(user);
  }
}
