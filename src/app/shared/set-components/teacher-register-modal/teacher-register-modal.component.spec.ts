import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRegisterModalComponent } from './teacher-register-modal.component';

describe('TeacherRegisterModalComponent', () => {
  let component: TeacherRegisterModalComponent;
  let fixture: ComponentFixture<TeacherRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRegisterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
