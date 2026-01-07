// Q2: Reactive programming with Observables, RxJS, and HttpClient

import { Component } from '@angular/core';
import { ObservableDemoComponent } from './observable-demo/observable-demo.component';
import { SearchDemoComponent } from './search-demo/search-demo.component';

@Component({
  selector: 'app-q2-page',
  standalone: true,
  imports: [ObservableDemoComponent, SearchDemoComponent],
  templateUrl: './q2-page.component.html',
  styleUrl: './q2-page.component.scss'
})
export class Q2PageComponent {}
