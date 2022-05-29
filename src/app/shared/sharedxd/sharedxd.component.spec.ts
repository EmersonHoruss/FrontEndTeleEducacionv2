import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedxdComponent } from './sharedxd.component';

describe('SharedxdComponent', () => {
  let component: SharedxdComponent;
  let fixture: ComponentFixture<SharedxdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedxdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedxdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
