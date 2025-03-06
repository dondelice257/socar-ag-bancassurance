import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireContractComponent } from './fire-contract.component';

describe('FireContractComponent', () => {
  let component: FireContractComponent;
  let fixture: ComponentFixture<FireContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FireContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
