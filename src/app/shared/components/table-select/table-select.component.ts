import { Component, Input, Output,AfterViewInit, ViewChild } from '@angular/core';
import { DefaultTableSelect } from '../../constants/default-table-select';
import { TableSelectInterface } from '../../interfaces/table-select-interface';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.scss'],
})

export class TableSelectComponent {
  @Input() table_select:TableSelectInterface = DefaultTableSelect;
  @Output() selectedRow = { index: '0' };

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  
  constructor() {
  }


  setSelectedRow(row: any) {
    this.selectedRow.index = row.index;
  }

  isSelectedRow(row: any) {
    return row.index === this.selectedRow.index;
  }

}
