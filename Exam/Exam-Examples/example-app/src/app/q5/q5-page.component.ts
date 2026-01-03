import { Component } from '@angular/core';
import { SignalsDemoComponent } from './signals-demo.component';
import { MaterialDemoComponent } from './material-demo.component';

@Component({
  selector: 'app-q5-page',
  standalone: true,
  imports: [SignalsDemoComponent, MaterialDemoComponent],
  templateUrl: './q5-page.component.html',
  styleUrl: './q5-page.component.scss'
})
export class Q5PageComponent {}
