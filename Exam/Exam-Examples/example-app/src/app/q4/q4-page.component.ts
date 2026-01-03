import { Component } from '@angular/core';
import { ReactiveProfileComponent } from './reactive-profile.component';
import { TemplateDrivenProfileComponent } from './template-profile.component';

@Component({
  selector: 'app-q4-page',
  standalone: true,
  imports: [ReactiveProfileComponent, TemplateDrivenProfileComponent],
  template: `
    <h2>Question 4 – Forms & Testing</h2>

    <section>
      <h3>Reactive form</h3>
      <app-reactive-profile></app-reactive-profile>
    </section>

    <section>
      <h3>Template-driven form</h3>
      <app-template-profile></app-template-profile>
    </section>
  `,
})
export class Q4PageComponent {}
