import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSelectRolUserComponent } from './login-select-rol-user.component';

describe('LoginSelectRolUserComponent', () => {
  let component: LoginSelectRolUserComponent;
  let fixture: ComponentFixture<LoginSelectRolUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSelectRolUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSelectRolUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
