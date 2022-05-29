import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRegisterFormComponent } from './exam-register-form.component';

describe('ExamRegisterFormComponent', () => {
  let component: ExamRegisterFormComponent;
  let fixture: ComponentFixture<ExamRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamRegisterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
