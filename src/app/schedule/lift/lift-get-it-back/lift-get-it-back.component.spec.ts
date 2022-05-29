import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftGetItBackComponent } from './lift-get-it-back.component';

describe('LiftGetItBackComponent', () => {
  let component: LiftGetItBackComponent;
  let fixture: ComponentFixture<LiftGetItBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftGetItBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftGetItBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
