import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoContractComponent } from './auto-contract.component';

describe('AutoContractComponent', () => {
  let component: AutoContractComponent;
  let fixture: ComponentFixture<AutoContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
