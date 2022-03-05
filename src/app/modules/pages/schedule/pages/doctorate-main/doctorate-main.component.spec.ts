import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorateMainComponent } from './doctorate-main.component';

describe('DoctorateMainComponent', () => {
  let component: DoctorateMainComponent;
  let fixture: ComponentFixture<DoctorateMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorateMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
