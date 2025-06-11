import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncaissementsListComponent } from './encaissements-list.component';

describe('EncaissementsListComponent', () => {
  let component: EncaissementsListComponent;
  let fixture: ComponentFixture<EncaissementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncaissementsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncaissementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
