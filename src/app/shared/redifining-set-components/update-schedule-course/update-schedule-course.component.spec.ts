import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScheduleCourseComponent } from './update-schedule-course.component';

describe('UpdateScheduleCourseComponent', () => {
  let component: UpdateScheduleCourseComponent;
  let fixture: ComponentFixture<UpdateScheduleCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateScheduleCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScheduleCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
