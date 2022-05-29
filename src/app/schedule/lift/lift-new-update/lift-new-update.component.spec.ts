import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftNewUpdateComponent } from './lift-new-update.component';

describe('LiftNewUpdateComponent', () => {
  let component: LiftNewUpdateComponent;
  let fixture: ComponentFixture<LiftNewUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftNewUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftNewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
