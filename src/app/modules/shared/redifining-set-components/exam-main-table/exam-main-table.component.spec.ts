import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMainTableComponent } from './exam-main-table.component';

describe('ExamMainTableComponent', () => {
  let component: ExamMainTableComponent;
  let fixture: ComponentFixture<ExamMainTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMainTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
