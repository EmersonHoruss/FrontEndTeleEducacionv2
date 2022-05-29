import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateProgramComponent } from './new-update-program.component';

describe('NewUpdateProgramComponent', () => {
  let component: NewUpdateProgramComponent;
  let fixture: ComponentFixture<NewUpdateProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
