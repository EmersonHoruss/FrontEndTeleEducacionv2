import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMainSelectComponent } from './exam-main-select.component';

describe('ExamMainSelectComponent', () => {
  let component: ExamMainSelectComponent;
  let fixture: ComponentFixture<ExamMainSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMainSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMainSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
