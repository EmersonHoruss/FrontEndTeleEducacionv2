import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftMainAllContentComponent } from './lift-main-all-content.component';

describe('LiftMainAllContentComponent', () => {
  let component: LiftMainAllContentComponent;
  let fixture: ComponentFixture<LiftMainAllContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftMainAllContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftMainAllContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
