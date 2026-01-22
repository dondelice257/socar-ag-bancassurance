import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VignettesListComponent } from './vignettes-list.component';

describe('VignettesListComponent', () => {
  let component: VignettesListComponent;
  let fixture: ComponentFixture<VignettesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VignettesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VignettesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
