import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyChangementPlaqueComponent } from './policy-changement-plaque.component';

describe('PolicyChangementPlaqueComponent', () => {
  let component: PolicyChangementPlaqueComponent;
  let fixture: ComponentFixture<PolicyChangementPlaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyChangementPlaqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PolicyChangementPlaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
