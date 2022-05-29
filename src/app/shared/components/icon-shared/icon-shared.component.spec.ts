import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSharedComponent } from './icon-shared.component';

describe('IconSharedComponent', () => {
  let component: IconSharedComponent;
  let fixture: ComponentFixture<IconSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
