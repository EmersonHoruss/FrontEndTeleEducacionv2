import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMainComponent } from './exam-main.component';

describe('ExamMainComponent', () => {
  let component: ExamMainComponent;
  let fixture: ComponentFixture<ExamMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
