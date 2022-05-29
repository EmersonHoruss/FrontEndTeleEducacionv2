import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramButtonsComponent } from './program-buttons.component';

describe('ProgramButtonsComponent', () => {
  let component: ProgramButtonsComponent;
  let fixture: ComponentFixture<ProgramButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
