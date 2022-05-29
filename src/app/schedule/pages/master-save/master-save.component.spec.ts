import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSaveComponent } from './master-save.component';

describe('MasterSaveComponent', () => {
  let component: MasterSaveComponent;
  let fixture: ComponentFixture<MasterSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
