import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-profile',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <label for="td-first-name">First name</label>
      <input id="td-first-name" name="firstName" ngModel required />
      <button type="submit" [disabled]="f.invalid">Save</button>
    </form>
  `,
})
export class TemplateDrivenProfileComponent {
  onSubmit(form: NgForm) {
    console.log('Template-driven value', form.value);
    form.reset();
  }
}
