import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesOffersComponent } from './policies-offers.component';

describe('PoliciesOffersComponent', () => {
  let component: PoliciesOffersComponent;
  let fixture: ComponentFixture<PoliciesOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliciesOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliciesOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
