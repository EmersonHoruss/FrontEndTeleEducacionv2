import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterSessionsComponent } from './program-master-sessions.component';

describe('ProgramMasterSessionsComponent', () => {
  let component: ProgramMasterSessionsComponent;
  let fixture: ComponentFixture<ProgramMasterSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMasterSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
