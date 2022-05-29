import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftRegisterComponent } from './lift-register.component';

describe('LiftRegisterComponent', () => {
  let component: LiftRegisterComponent;
  let fixture: ComponentFixture<LiftRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
