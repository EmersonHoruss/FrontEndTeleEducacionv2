import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingPostgradeButtonComponent } from './tracking-postgrade-button.component';

describe('TrackingPostgradeButtonComponent', () => {
  let component: TrackingPostgradeButtonComponent;
  let fixture: ComponentFixture<TrackingPostgradeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingPostgradeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingPostgradeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
