import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftNewUpdateContentComponent } from './lift-new-update-content.component';

describe('LiftNewUpdateContentComponent', () => {
  let component: LiftNewUpdateContentComponent;
  let fixture: ComponentFixture<LiftNewUpdateContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftNewUpdateContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftNewUpdateContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
