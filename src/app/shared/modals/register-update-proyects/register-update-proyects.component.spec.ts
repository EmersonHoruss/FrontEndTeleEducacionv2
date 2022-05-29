import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUpdateProyectsComponent } from './register-update-proyects.component';

describe('RegisterUpdateProyectsComponent', () => {
  let component: RegisterUpdateProyectsComponent;
  let fixture: ComponentFixture<RegisterUpdateProyectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUpdateProyectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUpdateProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
