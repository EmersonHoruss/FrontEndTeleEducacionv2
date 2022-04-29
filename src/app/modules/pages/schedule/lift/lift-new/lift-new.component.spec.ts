import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiftNewComponent } from './lift-new.component';

describe('LiftNewComponent', () => {
  let component: LiftNewComponent;
  let fixture: ComponentFixture<LiftNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiftNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiftNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
