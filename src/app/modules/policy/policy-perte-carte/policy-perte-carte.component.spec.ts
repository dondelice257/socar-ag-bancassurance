import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPerteCarteComponent } from './policy-perte-carte.component';

describe('PolicyPerteCarteComponent', () => {
  let component: PolicyPerteCarteComponent;
  let fixture: ComponentFixture<PolicyPerteCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyPerteCarteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolicyPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
