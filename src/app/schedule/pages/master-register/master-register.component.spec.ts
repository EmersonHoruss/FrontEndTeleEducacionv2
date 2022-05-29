import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterComponent } from './master-register.component';

describe('MasterRegisterComponent', () => {
  let component: MasterRegisterComponent;
  let fixture: ComponentFixture<MasterRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
