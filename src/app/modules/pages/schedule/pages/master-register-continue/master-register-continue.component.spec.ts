import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterContinueComponent } from './master-register-continue.component';

describe('MasterRegisterContinueComponent', () => {
  let component: MasterRegisterContinueComponent;
  let fixture: ComponentFixture<MasterRegisterContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRegisterContinueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
