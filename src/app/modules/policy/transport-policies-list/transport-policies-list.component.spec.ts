import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportPoliciesListComponent } from './transport-policies-list.component';

describe('TransportPoliciesListComponent', () => {
  let component: TransportPoliciesListComponent;
  let fixture: ComponentFixture<TransportPoliciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportPoliciesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportPoliciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
