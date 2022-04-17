import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterManagementComponentComponent } from './master-management-component.component';

describe('MasterManagementComponentComponent', () => {
  let component: MasterManagementComponentComponent;
  let fixture: ComponentFixture<MasterManagementComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterManagementComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
