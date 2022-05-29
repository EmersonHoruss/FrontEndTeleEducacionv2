import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterUpdateSessionsComponent } from './program-master-update-sessions.component';

describe('ProgramMasterUpdateSessionsComponent', () => {
  let component: ProgramMasterUpdateSessionsComponent;
  let fixture: ComponentFixture<ProgramMasterUpdateSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMasterUpdateSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterUpdateSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
