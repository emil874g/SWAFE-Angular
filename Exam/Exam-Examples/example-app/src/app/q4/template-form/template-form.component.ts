// template-form.component.ts
// Q4: Template-Driven Forms

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserModel {
  name: string;
  email: string;
  age: number | null;
  bio: string;
}

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {
  model: UserModel = {
    name: '',
    email: '',
    age: null,
    bio: ''
  };

  submitted = false;

  onSubmit(form: any): void {
    this.submitted = true;

    if (form.invalid) {
      console.log('Form is invalid');
      return;
    }

    console.log('Form submitted:', this.model);
    alert('Form submitted successfully!\n' + JSON.stringify(this.model, null, 2));
  }

  reset(form: any): void {
    this.submitted = false;
    form.reset();
    this.model = { name: '', email: '', age: null, bio: '' };
  }
}
