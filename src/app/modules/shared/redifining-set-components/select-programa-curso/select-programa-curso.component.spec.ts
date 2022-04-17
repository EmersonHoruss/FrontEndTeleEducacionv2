import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProgramaCursoComponent } from './select-programa-curso.component';

describe('SelectProgramaCursoComponent', () => {
  let component: SelectProgramaCursoComponent;
  let fixture: ComponentFixture<SelectProgramaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProgramaCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProgramaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
