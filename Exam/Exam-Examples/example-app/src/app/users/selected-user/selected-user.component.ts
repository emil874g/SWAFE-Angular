import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-selected-user',
  standalone: true,
  imports: [NgIf],
  template: `
    <h3 *ngIf="selectedUser; else noUser">
      Selected: {{ selectedUser!.name }}
    </h3>
    <ng-template #noUser>
      <p>No user selected</p>
    </ng-template>
  `,
})
export class SelectedUserComponent {
  selectedUser: User | null = null;

  constructor(private userService: UserService) {
    this.userService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }
}
