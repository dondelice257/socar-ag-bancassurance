import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPoliciesListComponent } from './credit-policies-list.component';

describe('CreditPoliciesListComponent', () => {
  let component: CreditPoliciesListComponent;
  let fixture: ComponentFixture<CreditPoliciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditPoliciesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditPoliciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
