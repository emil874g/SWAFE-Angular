import { Component } from '@angular/core';
import { SignalsDemoComponent } from './signals-demo/signals-demo.component';
import { SignalStoreDemoComponent } from './signal-store-demo/signal-store-demo.component';
import { ResponsiveDemoComponent } from './responsive-demo/responsive-demo.component';
import { MaterialDemoComponent } from './material-demo/material-demo.component';

@Component({
  selector: 'app-q5-page',
  standalone: true,
  imports: [
    SignalsDemoComponent,
    SignalStoreDemoComponent,
    ResponsiveDemoComponent,
    MaterialDemoComponent
  ],
  templateUrl: './q5-page.component.html',
  styleUrl: './q5-page.component.scss'
})
export class Q5PageComponent {}
