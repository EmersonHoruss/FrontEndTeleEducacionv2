import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSelectFilterComponent } from './table-select-filter.component';

describe('TableSelectFilterComponent', () => {
  let component: TableSelectFilterComponent;
  let fixture: ComponentFixture<TableSelectFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSelectFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSelectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
