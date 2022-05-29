import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFromToComponent } from './time-from-to.component';

describe('TimeFromToComponent', () => {
  let component: TimeFromToComponent;
  let fixture: ComponentFixture<TimeFromToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeFromToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFromToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
