import { Component } from '@angular/core';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { TestingDemoComponent } from './testing-demo/testing-demo.component';

@Component({
  selector: 'app-q4-page',
  standalone: true,
  imports: [
    ReactiveFormComponent,
    TemplateFormComponent,
    TestingDemoComponent
  ],
  templateUrl: './q4-page.component.html',
  styleUrl: './q4-page.component.scss'
})
export class Q4PageComponent {}
