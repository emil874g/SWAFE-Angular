import { Component } from '@angular/core';
import { ReactiveProfileComponent } from './reactive-profile.component';
import { TemplateDrivenProfileComponent } from './template-profile.component';

@Component({
  selector: 'app-q4-page',
  standalone: true,
  imports: [ReactiveProfileComponent, TemplateDrivenProfileComponent],
  templateUrl: './q4-page.component.html',
  styleUrl: './q4-page.component.scss'
})
export class Q4PageComponent {}
