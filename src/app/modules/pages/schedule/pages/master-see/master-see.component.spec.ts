import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSeeComponent } from './master-see.component';

describe('MasterSeeComponent', () => {
  let component: MasterSeeComponent;
  let fixture: ComponentFixture<MasterSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
