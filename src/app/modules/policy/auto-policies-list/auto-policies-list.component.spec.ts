import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPoliciesListComponent } from './auto-policies-list.component';

describe('AutoPoliciesListComponent', () => {
  let component: AutoPoliciesListComponent;
  let fixture: ComponentFixture<AutoPoliciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoPoliciesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoPoliciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
