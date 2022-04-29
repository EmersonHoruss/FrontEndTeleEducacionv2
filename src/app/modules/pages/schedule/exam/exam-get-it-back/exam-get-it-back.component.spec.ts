import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGetItBackComponent } from './exam-get-it-back.component';

describe('ExamGetItBackComponent', () => {
  let component: ExamGetItBackComponent;
  let fixture: ComponentFixture<ExamGetItBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamGetItBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamGetItBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
