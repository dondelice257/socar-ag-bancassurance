import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireFormComponent } from './fire-form.component';

describe('FireFormComponent', () => {
  let component: FireFormComponent;
  let fixture: ComponentFixture<FireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
