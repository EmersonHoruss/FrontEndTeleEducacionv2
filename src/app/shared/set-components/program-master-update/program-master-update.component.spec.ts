import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterUpdateComponent } from './program-master-update.component';

describe('ProgramMasterUpdateComponent', () => {
  let component: ProgramMasterUpdateComponent;
  let fixture: ComponentFixture<ProgramMasterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMasterUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
