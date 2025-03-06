import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyRenewComponent } from './policy-renew.component';

describe('PolicyRenewComponent', () => {
  let component: PolicyRenewComponent;
  let fixture: ComponentFixture<PolicyRenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyRenewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolicyRenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
