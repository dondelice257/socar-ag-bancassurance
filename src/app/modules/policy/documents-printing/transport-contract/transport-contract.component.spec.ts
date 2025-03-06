import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportContractComponent } from './transport-contract.component';

describe('TransportContractComponent', () => {
  let component: TransportContractComponent;
  let fixture: ComponentFixture<TransportContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
