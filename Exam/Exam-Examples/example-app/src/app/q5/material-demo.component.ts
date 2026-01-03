import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatCardModule],
  templateUrl: './material-demo.component.html',
  styleUrl: './material-demo.component.scss'
})
export class MaterialDemoComponent {}
