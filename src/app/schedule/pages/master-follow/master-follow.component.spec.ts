import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFollowComponent } from './master-follow.component';

describe('MasterFollowComponent', () => {
  let component: MasterFollowComponent;
  let fixture: ComponentFixture<MasterFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterFollowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
