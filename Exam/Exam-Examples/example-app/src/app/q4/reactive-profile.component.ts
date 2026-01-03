import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <label for="first-name">First name</label>
      <input id="first-name" type="text" formControlName="firstName" />
      @if (profileForm.controls.firstName.invalid &&
           (profileForm.controls.firstName.dirty || profileForm.controls.firstName.touched)) {
        <div class="error">First name is required</div>
      }
      <button type="submit" [disabled]="profileForm.invalid">Save</button>
    </form>
  `,
})
export class ReactiveProfileComponent {
  private fb = inject(FormBuilder);
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
  });

  onSubmit() {
    console.log('Reactive form value', this.profileForm.value);
  }
}
