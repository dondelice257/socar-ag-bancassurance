import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationsListComponent } from './declarations-list.component';

describe('DeclarationsListComponent', () => {
  let component: DeclarationsListComponent;
  let fixture: ComponentFixture<DeclarationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
