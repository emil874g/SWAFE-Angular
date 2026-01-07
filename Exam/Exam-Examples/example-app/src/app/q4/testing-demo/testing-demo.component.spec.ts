// testing-demo.component.spec.ts
// Q4: Unit tests for TestingDemoComponent

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingDemoComponent } from './testing-demo.component';

describe('TestingDemoComponent', () => {
  let component: TestingDemoComponent;
  let fixture: ComponentFixture<TestingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingDemoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic component test
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test component property
  it('should have correct title', () => {
    expect(component.title).toBe('Testing Demo');
  });

  // Test method - simple calculation
  it('should add two numbers correctly', () => {
    expect(component.add(2, 3)).toBe(5);
    expect(component.add(-1, 1)).toBe(0);
    expect(component.add(0, 0)).toBe(0);
  });

  // Test method - boolean logic
  it('should check if number is even', () => {
    expect(component.isEven(4)).toBe(true);
    expect(component.isEven(5)).toBe(false);
    expect(component.isEven(0)).toBe(true);
  });

  // Test state changes
  it('should increment count', () => {
    expect(component.count).toBe(0);
    component.increment();
    expect(component.count).toBe(1);
    component.increment();
    expect(component.count).toBe(2);
  });

  it('should decrement count', () => {
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
  });

  it('should reset count to zero', () => {
    component.count = 10;
    component.reset();
    expect(component.count).toBe(0);
  });

  // Test DOM rendering
  it('should render title in h3', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Testing Demo');
  });

  // Test DOM interaction
  it('should update count when button is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const incrementBtn = buttons[0];

    expect(component.count).toBe(0);
    incrementBtn.click();
    expect(component.count).toBe(1);
  });
});
