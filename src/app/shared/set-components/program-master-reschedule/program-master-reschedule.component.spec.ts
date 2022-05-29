import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterRescheduleComponent } from './program-master-reschedule.component';

describe('ProgramMasterRescheduleComponent', () => {
  let component: ProgramMasterRescheduleComponent;
  let fixture: ComponentFixture<ProgramMasterRescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMasterRescheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterRescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
