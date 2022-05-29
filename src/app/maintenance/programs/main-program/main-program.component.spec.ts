import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProgramComponent } from './main-program.component';

describe('MainProgramComponent', () => {
  let component: MainProgramComponent;
  let fixture: ComponentFixture<MainProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
