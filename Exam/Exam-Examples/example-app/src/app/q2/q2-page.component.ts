// Q2: focus on Observables + "HTTP" + operators.

import { Component } from '@angular/core';
import { UserListComponent } from '../users/user-list/user-list.component';
import { UserSearchComponent } from '../users/user-search/user-search.component';

@Component({
  selector: 'app-q2-page',
  standalone: true,
  imports: [UserListComponent, UserSearchComponent],
  templateUrl: './q2-page.component.html',
  styleUrl: './q2-page.component.scss'
})
export class Q2PageComponent {}
