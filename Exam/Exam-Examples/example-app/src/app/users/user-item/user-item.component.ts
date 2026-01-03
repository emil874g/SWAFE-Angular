// user-item.component.ts
// Q1: child component used to demonstrate @Input/@Output and a built‑in pipe

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { User } from '../user.service';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [UpperCasePipe],
  styleUrls: ['./user-item.component.scss'],
  template: `
    <div class="user-card" (click)="handleClick()">
      {{ user?.name | uppercase }}
    </div>
  `,
})
export class UserItemComponent {
  @Input() user!: User;                    // Q1: parent → child communication
  @Output() selected = new EventEmitter<User>(); // Q1: child → parent communication

  handleClick(): void {
    this.selected.emit(this.user);
  }
}
