import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProjectComponent } from './main-project.component';

describe('MainProjectComponent', () => {
  let component: MainProjectComponent;
  let fixture: ComponentFixture<MainProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
