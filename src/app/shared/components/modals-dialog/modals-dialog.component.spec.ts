import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsDialogComponent } from './modals-dialog.component';

describe('ModalsDialogComponent', () => {
  let component: ModalsDialogComponent;
  let fixture: ComponentFixture<ModalsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
