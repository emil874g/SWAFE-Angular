// app.component.ts
import { Component } from '@angular/core';
import { UserListComponent } from './users/user-list/user-list.component';
import { SelectedUserComponent } from './users/selected-user/selected-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserListComponent, SelectedUserComponent],
  template: `
    <app-user-list></app-user-list>
    <app-selected-user></app-selected-user>
  `,
})
export class App {}
