import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-profile.component.html',
  styleUrl: './reactive-profile.component.scss'
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
