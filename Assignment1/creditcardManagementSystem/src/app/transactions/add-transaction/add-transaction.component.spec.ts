import { TestBed } from '@angular/core/testing';
import { AddTransactionComponent } from './add-transaction.component';

describe('AddTransactionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTransactionComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AddTransactionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
