import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateStudentComponent } from './new-update-student.component';

describe('NewUpdateStudentComponent', () => {
  let component: NewUpdateStudentComponent;
  let fixture: ComponentFixture<NewUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
