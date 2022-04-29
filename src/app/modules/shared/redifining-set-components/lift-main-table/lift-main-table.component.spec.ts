import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftMainTableComponent } from './lift-main-table.component';

describe('LiftMainTableComponent', () => {
  let component: LiftMainTableComponent;
  let fixture: ComponentFixture<LiftMainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftMainTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
