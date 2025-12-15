import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirePoliciesListComponent } from './fire-policies-list.component';

describe('FirePoliciesListComponent', () => {
  let component: FirePoliciesListComponent;
  let fixture: ComponentFixture<FirePoliciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirePoliciesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirePoliciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
