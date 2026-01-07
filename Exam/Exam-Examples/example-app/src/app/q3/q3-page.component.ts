// Q3: Routing, lazy-loading, guards, SSR

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { SsrDemoComponent } from './ssr-demo/ssr-demo.component';

@Component({
  selector: 'app-q3-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ProductListComponent, SsrDemoComponent],
  templateUrl: './q3-page.component.html',
  styleUrl: './q3-page.component.scss'
})
export class Q3PageComponent {}
