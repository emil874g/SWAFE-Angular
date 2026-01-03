import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [NgIf],
  template: `
    <h3>User detail</h3>
    <p *ngIf="userId">Loaded user with id: {{ userId }}</p>
  `,
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  userId = this.route.snapshot.paramMap.get('id');
}
