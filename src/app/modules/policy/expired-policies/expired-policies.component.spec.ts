import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPoliciesComponent } from './expired-policies.component';

describe('ExpiredPoliciesComponent', () => {
  let component: ExpiredPoliciesComponent;
  let fixture: ComponentFixture<ExpiredPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredPoliciesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpiredPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
