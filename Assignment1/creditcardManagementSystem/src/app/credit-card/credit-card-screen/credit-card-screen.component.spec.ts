import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardScreenComponent } from './credit-card-screen.component';

describe('CreditCardScreenComponent', () => {
  let component: CreditCardScreenComponent;
  let fixture: ComponentFixture<CreditCardScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
