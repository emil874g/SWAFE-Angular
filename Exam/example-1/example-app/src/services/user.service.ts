import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface User {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root'})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  private selectedUserSubject = new BehaviorSubject<User | null>(null);
  selectedUser$ = this.selectedUserSubject.asObservable();

  getUsers(): User[] {
    return this.users;
  }
  selectUser(user: User): void {
    this.selectedUserSubject.next(user);
  }
}
