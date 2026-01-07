// reactive-form.component.ts
// Q4: Reactive Forms with validation

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {
  profileForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    // Create form with FormBuilder
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      bio: ['', Validators.maxLength(200)]
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.profileForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.profileForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    console.log('Form submitted:', this.profileForm.value);
    alert('Form submitted successfully!\n' + JSON.stringify(this.profileForm.value, null, 2));
  }

  reset(): void {
    this.submitted = false;
    this.profileForm.reset();
  }
}
