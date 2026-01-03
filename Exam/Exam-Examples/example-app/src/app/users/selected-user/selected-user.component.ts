// selected-user.component.ts
// Q1: sibling component that reacts to shared state in UserService (BehaviorSubject)

import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-selected-user',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./selected-user.component.scss'],
  template: `
    <div class="selected-card">
      <h3 *ngIf="selectedUser; else noUser">
        Selected: {{ selectedUser!.name }}
      </h3>
      <ng-template #noUser>
        <p>No user selected</p>
      </ng-template>
    </div>
  `,
})
export class SelectedUserComponent {
  selectedUser: User | null = null;

  constructor(private userService: UserService) {
    // Q1: subscribing to shared stream for component‑to‑component communication
    this.userService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }
}
