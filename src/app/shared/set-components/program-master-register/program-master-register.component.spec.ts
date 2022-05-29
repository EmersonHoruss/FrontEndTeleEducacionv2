import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMasterRegisterComponent } from './program-master-register.component';

describe('ProgramMasterRegisterComponent', () => {
  let component: ProgramMasterRegisterComponent;
  let fixture: ComponentFixture<ProgramMasterRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramMasterRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMasterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
