import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftMainComponent } from './lift-main.component';

describe('LiftMainComponent', () => {
  let component: LiftMainComponent;
  let fixture: ComponentFixture<LiftMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
