import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-profile.component.html',
  styleUrl: './template-profile.component.scss'
})
export class TemplateDrivenProfileComponent {
  onSubmit(form: NgForm) {
    console.log('Template-driven value', form.value);
    form.reset();
  }
}
