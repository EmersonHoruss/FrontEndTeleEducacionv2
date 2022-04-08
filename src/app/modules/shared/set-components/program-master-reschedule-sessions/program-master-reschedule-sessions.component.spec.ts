import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterRescheduleSessionsComponent } from './program-master-reschedule-sessions.component';

describe('ProgramMasterRescheduleSessionsComponent', () => {
  let component: ProgramMasterRescheduleSessionsComponent;
  let fixture: ComponentFixture<ProgramMasterRescheduleSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMasterRescheduleSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterRescheduleSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
