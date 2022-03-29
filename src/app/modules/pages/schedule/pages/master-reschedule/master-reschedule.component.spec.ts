import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRescheduleComponent } from './master-reschedule.component';

describe('MasterRescheduleComponent', () => {
  let component: MasterRescheduleComponent;
  let fixture: ComponentFixture<MasterRescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRescheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
