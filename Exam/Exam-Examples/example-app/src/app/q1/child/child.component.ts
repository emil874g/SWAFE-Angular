// child.component.ts
// Q1: Child Component - demonstrates @Input and @Output

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Child Component
 * Demonstrates component-to-component communication:
 * - @Input: Receives data from parent
 * - @Output: Sends events to parent
 */
@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  /**
   * @Input Property
   * - Receives data from parent component
   * - Parent binds: <app-child [message]="parentData"></app-child>
   * - One-way data flow: parent → child
   */
  @Input() message: string = '';
  @Input() count: number = 0;

  /**
   * @Output Property
   * - Sends events to parent component
   * - EventEmitter is an Observable that emits events
   * - Parent listens: <app-child (notify)="handleNotify($event)"></app-child>
   * - One-way data flow: child → parent
   */
  @Output() notify = new EventEmitter<string>();

  /**
   * Method called by template button
   * Emits event to parent
   */
  sendNotification(): void {
    const eventData = `Child says: Button clicked at ${new Date().toLocaleTimeString()}`;
    this.notify.emit(eventData);
  }
}

/**
 * Key Points:
 *
 * @Input: Property binding (parent → child)
 * - Passes data DOWN the component tree
 * - Child cannot modify parent's data directly
 *
 * @Output: Event binding (child → parent)
 * - Sends events UP the component tree
 * - Parent decides how to handle the event
 *
 * Alternative: Service for sibling/distant component communication
 */
