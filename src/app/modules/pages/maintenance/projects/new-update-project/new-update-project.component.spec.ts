import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateProjectComponent } from './new-update-project.component';

describe('NewUpdateProjectComponent', () => {
  let component: NewUpdateProjectComponent;
  let fixture: ComponentFixture<NewUpdateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
