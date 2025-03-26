import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditContratComponent } from './credit-contrat.component';

describe('CreditContratComponent', () => {
  let component: CreditContratComponent;
  let fixture: ComponentFixture<CreditContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditContratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
