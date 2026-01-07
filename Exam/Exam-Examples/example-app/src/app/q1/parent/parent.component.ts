// parent.component.ts
// Q1: Parent Component - demonstrates all basic Angular concepts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Item } from '../data.service';
import { ChildComponent } from '../child/child.component';

/**
 * Parent Component
 * Demonstrates:
 * 1. Component structure (@Component decorator)
 * 2. Dependency Injection (constructor)
 * 3. Lifecycle hooks (OnInit)
 * 4. Component communication (passing data to child)
 */
@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [
    CommonModule,           // NgFor, NgIf, NgClass, NgStyle, built-in pipes
    ChildComponent          // Child component
  ],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  // Component properties
  title: string = 'Angular Basics Demo';
  items: Item[] = [];
  messageToChild: string = 'Hello from Parent!';
  notificationFromChild: string = '';
  currentDate: Date = new Date();
  isHighlighted: boolean = false;

  /**
   * Constructor: Dependency Injection
   * - Angular's DI system provides DataService instance
   * - Service is created by Angular and injected automatically
   * - 'private' creates a class property automatically
   */
  constructor(private dataService: DataService) {
    console.log('ParentComponent instantiated');
  }

  /**
   * Lifecycle Hook: ngOnInit
   * - Called after constructor
   * - Good place for initialization logic
   * - Other hooks: ngOnChanges, ngOnDestroy, ngAfterViewInit, etc.
   */
  ngOnInit(): void {
    console.log('ParentComponent initialized');
    // Use injected service
    this.items = this.dataService.getItems();
  }

  /**
   * Component method
   * Called from template
   */
  getItemCount(): number {
    return this.dataService.getCount();
  }

  /**
   * Event handler: Receives event from child
   * Demonstrates @Output communication
   */
  handleChildNotification(message: string): void {
    console.log('Received from child:', message);
    this.notificationFromChild = message;
  }

  /**
   * Add new item using service
   */
  addNewItem(): void {
    this.dataService.addItem('New Item');
    this.items = this.dataService.getItems();
  }

  /**
   * Toggle highlight state
   * Used to demonstrate NgClass directive
   */
  toggleHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }
}

/**
 * Component Anatomy Explained:
 *
 * @Component Decorator:
 * - selector: HTML tag name (<app-parent>)
 * - standalone: true (Angular 14+, no NgModule needed)
 * - imports: Dependencies (components, pipes, directives)
 * - templateUrl: External HTML template (or inline 'template')
 * - styleUrls: Component-scoped styles (or inline 'styles')
 *
 * Class:
 * - Properties: Component state
 * - Constructor: Dependency injection
 * - Lifecycle hooks: Special methods called by Angular
 * - Methods: Logic callable from template
 */
