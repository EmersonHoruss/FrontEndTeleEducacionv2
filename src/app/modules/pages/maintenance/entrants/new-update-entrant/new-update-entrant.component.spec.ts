import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateEntrantComponent } from './new-update-entrant.component';

describe('NewUpdateEntrantComponent', () => {
  let component: NewUpdateEntrantComponent;
  let fixture: ComponentFixture<NewUpdateEntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateEntrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUpdateEntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
