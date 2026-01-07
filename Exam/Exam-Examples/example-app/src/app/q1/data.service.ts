// data.service.ts
// EXAMPLE 1: Service demonstrating Dependency Injection

import { Injectable } from '@angular/core';

// Simple data model
export interface Item {
  id: number;
  name: string;
}

/**
 * Injectable Service
 * - @Injectable decorator makes this class available for DI
 * - providedIn: 'root' creates a singleton instance app-wide
 */
@Injectable({
  providedIn: 'root' // Singleton service - one instance for entire app
})
export class DataService {
  // Private data storage
  private items: Item[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'RxJS' }
  ];

  // Constructor - can inject other services here
  constructor() {
    console.log('DataService instantiated');
  }

  /**
   * Get all items
   * Services encapsulate business logic and data access
   */
  getItems(): Item[] {
    return this.items;
  }

  /**
   * Add a new item
   */
  addItem(name: string): void {
    const newItem: Item = {
      id: this.items.length + 1,
      name
    };
    this.items.push(newItem);
  }

  /**
   * Get item count
   */
  getCount(): number {
    return this.items.length;
  }
}
