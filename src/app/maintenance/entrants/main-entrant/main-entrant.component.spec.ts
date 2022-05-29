import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEntrantComponent } from './main-entrant.component';

describe('MainEntrantComponent', () => {
  let component: MainEntrantComponent;
  let fixture: ComponentFixture<MainEntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainEntrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
