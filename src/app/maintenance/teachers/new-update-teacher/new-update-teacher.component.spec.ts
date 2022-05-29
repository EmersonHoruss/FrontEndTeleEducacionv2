import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateTeacherComponent } from './new-update-teacher.component';

describe('NewUpdateTeacherComponent', () => {
  let component: NewUpdateTeacherComponent;
  let fixture: ComponentFixture<NewUpdateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
