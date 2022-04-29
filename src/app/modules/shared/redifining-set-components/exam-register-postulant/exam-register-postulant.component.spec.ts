import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRegisterPostulantComponent } from './exam-register-postulant.component';

describe('ExamRegisterPostulantComponent', () => {
  let component: ExamRegisterPostulantComponent;
  let fixture: ComponentFixture<ExamRegisterPostulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamRegisterPostulantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRegisterPostulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
