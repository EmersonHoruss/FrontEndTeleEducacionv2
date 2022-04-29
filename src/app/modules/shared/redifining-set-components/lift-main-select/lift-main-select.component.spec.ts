import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftMainSelectComponent } from './lift-main-select.component';

describe('LiftMainSelectComponent', () => {
  let component: LiftMainSelectComponent;
  let fixture: ComponentFixture<LiftMainSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftMainSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftMainSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
