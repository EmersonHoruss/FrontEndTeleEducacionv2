import { Component, Input, Output } from '@angular/core';
import { TableSelectFilterInterface } from '../../interfaces/table-select-filter-interface';
import { DefaultTableSelectFilter } from '../../constants/default-table-select-filter';
import {MatTableDataSource} from '@angular/material/table';
import { DefaultInput } from '../../constants/default-input';
import { InputInterface } from '../../interfaces/input-interface';
import { DateInterface } from '../../interfaces/date-interface';
import { DefaultDate } from '../../constants/default-date';


@Component({
  selector: 'app-table-select-filter',
  templateUrl: './table-select-filter.component.html',
  styleUrls: ['./table-select-filter.component.scss']
})
export class TableSelectFilterComponent {

  @Input() table_select_filter:TableSelectFilterInterface = DefaultTableSelectFilter;
  @Output() selectedRow = { index: '0' };
  dataSource: MatTableDataSource<Columnass> = new MatTableDataSource(this.table_select_filter.dataSource);
  StartInput: InputInterface = JSON.parse(JSON.stringify(DefaultInput));
  EndInput  : InputInterface = JSON.parse(JSON.stringify(DefaultInput));
  
 
  constructor() {
    this.StartInput.placeholder = 'Desde: ';
    this.EndInput.placeholder   = 'Hasta: ';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setSelectedRow(row: any) {
    this.selectedRow.index = row.index;
  }

  isSelectedRow(row: any) {
    return row.index === this.selectedRow.index;
  }

}
interface Columnass {
  Id: number;
  'Column 2': string;
  'Column 3': string;
}