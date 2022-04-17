import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSessionsCourseComponent } from './management-sessions-course.component';

describe('ManagementSessionsCourseComponent', () => {
  let component: ManagementSessionsCourseComponent;
  let fixture: ComponentFixture<ManagementSessionsCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementSessionsCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSessionsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
