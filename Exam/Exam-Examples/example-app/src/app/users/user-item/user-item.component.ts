import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { User } from '../user.service';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [UpperCasePipe],
  template: `
    <li (click)="handleClick()">
      {{ user?.name | uppercase }}
    </li>
  `,
})
export class UserItemComponent {
  @Input() user!: User;
  @Output() selected = new EventEmitter<User>();

  handleClick(): void {
    this.selected.emit(this.user);
  }
}
