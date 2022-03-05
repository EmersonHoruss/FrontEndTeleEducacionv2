import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegisterStartComponent } from './master-register-start.component';

describe('MasterRegisterStartComponent', () => {
  let component: MasterRegisterStartComponent;
  let fixture: ComponentFixture<MasterRegisterStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRegisterStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegisterStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
