// user-list.component.ts
import { Component } from '@angular/core';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-list',
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
