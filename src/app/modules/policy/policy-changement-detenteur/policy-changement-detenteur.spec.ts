import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyChangementDetenteurComponent } from './policy-changement-detenteur.component';

describe('PolicyRenewComponent', () => {
  let component: PolicyChangementDetenteurComponent;
  let fixture: ComponentFixture<PolicyChangementDetenteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyChangementDetenteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolicyChangementDetenteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
