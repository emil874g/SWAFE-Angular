// Q1: Angular basics - components, services, pipes, directives, DI, communication

import { Component } from '@angular/core';
import { ParentComponent } from './parent/parent.component';

@Component({
  selector: 'app-q1-page',
  standalone: true,
  imports: [ParentComponent],
  templateUrl: './q1-page.component.html',
  styleUrl: './q1-page.component.scss'
})
export class Q1PageComponent {}
