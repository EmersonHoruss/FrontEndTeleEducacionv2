import {
  AfterViewInit,
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TableSelectFilterInterface } from '../../interfaces/table-select-filter-interface';
import { DefaultTableSelectFilter } from '../../constants/default-table-select-filter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from './table-select-filte.constants';

@Component({
  selector: 'app-table-select-filter',
  templateUrl: './table-select-filter.component.html',
  styleUrls: ['./table-select-filter.component.scss'],
  providers: [],
})
export class TableSelectFilterComponent implements OnInit {
  @Input() table_select_filter: TableSelectFilterInterface =
    DefaultTableSelectFilter;
  @Input() searchAvailable: boolean = false;
  @Output() selectedRow = { index: '0' };
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constants = Constants;

  dataSource: any;

  constructor() {}

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Filas por tabla: ';
    // this.paginator._intl.itemsPerPageLabel = 'Filas por tabla: ';
    this.dataSource = new MatTableDataSource(
      this.table_select_filter.dataSource
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setSelectedRow(row: any) {
    this.selectedRow.index = row.index;
  }

  isSelectedRow(row: any) {
    return row.index === this.selectedRow.index;
  }

  loadDataTable($event: any) {
    // console.log('asdf');
  }

  selectedStartDateEE($event: any) {}
  selectedEndDateEE($event: any) {}
}
